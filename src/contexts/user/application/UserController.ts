import { UserCredentialsPayloadEntity, UserEntity, UserPayloadEntity } from "../domain/UserEntity";
import { generateAuthenticationToken, generateHashPassword } from "./helpers/tokenUtils";
import { emailResponseHandler, isEmailValid } from "./helpers/emailExists";
import UserRepository from "../infrastructure/UserRepository";
import UserCredentialsRepository from "../infrastructure/UserCredentialsRepository";
import { sendVerificationEmail } from "../application/helpers/emailUtils";

export class UserController {
    constructor() {
    }

    async createUser(data: UserPayloadEntity, passwordData: string): Promise<UserEntity> {
        try {
            const development = process.env["NODE_ENV"] == "development";
            const emailCheckResponse = emailResponseHandler(
                await isEmailValid(data.email)
            );

            if (!emailCheckResponse && !development) {
                throw Error("Verify your email address");
            }

            const { hash, salt } = await generateHashPassword(passwordData);
            const verification_token = await generateAuthenticationToken();
            const userCredentialsData: UserCredentialsPayloadEntity = {
              password: hash,
              verification_token,
              salt,
            };

            const credentialsRecord = await UserCredentialsRepository.createUserCredentials(userCredentialsData);
            const { attributes: userAttributes } =
              await UserRepository.createUser({
                ...data,
                user_credential:
                  credentialsRecord.id as number,
              });
            await sendVerificationEmail(userAttributes.email, verification_token);

            return userAttributes;
        } catch (error) {
            console.log(error);
            throw Error('Cannot create user');
        }
    }

    async updateUserData(data: UserEntity, id: string) {

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

    async createUserCredentials(data: UserCredentialsPayloadEntity){
        const credentialsData =
          await UserCredentialsRepository.createUserCredentials(
            data
          );
        return credentialsData;
    }
}