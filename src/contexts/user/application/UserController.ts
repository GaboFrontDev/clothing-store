import { UserCredentialsEntity, UserPayloadEntity } from "../domain/UserEntity";
import { generateAuthenticationToken, generateHashPassword } from "./helpers/tokenUtils";
import { emailResponseHandler, isEmailValid } from "./helpers/emailExists";
import UserRepository from "../infrastructure/UserRepository";
import UserCredentialsRepository from "../infrastructure/UserCredentialsRepository";
import { sendVerificationEmail } from "../application/helpers/emailUtils";

export class UserController {
    constructor() {
    }

    private async sendVerificationEmail(email: string, token: string) {
        return await sendVerificationEmail(email, token);
    }


    async createUser(data: UserPayloadEntity, authenticationData: Omit<UserCredentialsEntity, 'salt' | 'autentication_token'>): Promise<UserPayloadEntity> {
        try {
            const development = process.env["NODE_ENV"] == "development";
            const emailCheckResponse = emailResponseHandler(
                await isEmailValid(data.email)
            );
            if (!emailCheckResponse && !development) {
                throw Error("Verify your email address");
            }

            const { hash, salt } = await generateHashPassword(authenticationData.password);
            const {id, attributes: userAttributes} = await UserRepository.createUser(data);
            const verification_token = await generateAuthenticationToken(id as string);
            const userCredentialsData = {
                password: hash,
                user_account: id,
                verification_token,
                salt
            };
            await UserCredentialsRepository.createUserCredentials(userCredentialsData);
            await this.sendVerificationEmail(verification_token, userAttributes.email);

            return userAttributes;
        } catch (error) {
            throw Error('Cannot create user');
        }
    }

    async updateUserData(data: UserPayloadEntity, id: string) {

        try {
            const userData = await UserRepository.getUserByEmail(data.email);
            if (userData.data.id != id) {
                throw Error('Email is not the same from the original account');
            }
            await UserRepository.updateAccountData(data, id);
        } catch (error) {
            console.log(error);
        }
    }
}