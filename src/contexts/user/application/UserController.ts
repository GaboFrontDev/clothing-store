import { UserEntity } from "../domain/UserEntity";
import { generateAuthenticationToken, generateHashPassword } from "./helpers/tokenUtils";
import { emailResponseHandler, isEmailValid } from "./helpers/emailExists";
import UserRepository from "../infrastructure/UserRepository";
import { sendVerificationEmail } from "../application/helpers/emailUtils";

export class UserController {
    constructor() {
    }

    private async sendVerificationEmail(email: string, token: string) {
        return await sendVerificationEmail(email, token);
      }
    

    async createUser(data: UserEntity): Promise<UserEntity> {
        try {
            const development = process.env["NODE_ENV"] == "development";
            const emailCheckResponse = emailResponseHandler(
                await isEmailValid(data.email)
            );
            if (!emailCheckResponse && !development) {
                throw Error("Verify your email address");
            }

            const persisted = await generateHashPassword(data.password);
            const userData = {
                password: persisted.hash,
                salt: persisted.salt,
                email: data.email,
                first_name: data.first_name.toLowerCase(),
                last_name: data.last_name.toLowerCase(),
                address: data.address.toLowerCase(),
                phone: data.phone.toLowerCase(),
                verified: false,
            };
            const user = await UserRepository.createUser(userData);
            const checkToken = await generateAuthenticationToken(user.id);
            await UserRepository.updateAccountVerificationToken(checkToken, user.id);
            await this.sendVerificationEmail(checkToken, user.email);

            return new Promise<UserEntity>(() => { })
        } catch (error) {
            throw Error('Cannot create user');
        }
    }

    async updateUserData(data: UserEntity, id: string) {
        try {
            const userData = await UserRepository.getUserByEmail(data.email);
            if(userData.id != id) { 
                throw Error('Email is not the same from the original account');
            }
            UserRepository.updateAccountData(data)
        } catch (error) {
            console.log(error);
        }
    }
}