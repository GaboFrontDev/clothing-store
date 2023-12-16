import { UserCredentialsPayloadEntity, UserEntity, UserPayloadEntity } from "../domain/UserEntity";
import { generateAuthenticationToken, generateHashPassword, generateVerificationToken } from "./helpers/tokenUtils";
import { emailResponseHandler, isEmailValid } from "./helpers/emailExists";
import UserRepository from "../infrastructure/UserRepository";
import UserCredentialsRepository from "../infrastructure/UserCredentialsRepository";
import { sendVerificationEmail } from "../application/helpers/emailUtils";

export class UserController {
    constructor() {
    }

    async createUser(data: UserPayloadEntity, passwordData: string) {
        try {
            const development = process.env["NODE_ENV"] == "development";
            const userExists = (await UserRepository.getUserByEmail(data.email)).data.length > 0;

            if(userExists){
                console.log("User already exits");
                
                throw Error("User already exists"); 
            }
            
            const emailCheckResponse = emailResponseHandler(
                await isEmailValid(data.email)
            );

            if (!emailCheckResponse && !development) {
                throw Error("Verify your email address");
            }

            const { hash, salt } = await generateHashPassword(passwordData);
            const userCredentialsData: UserCredentialsPayloadEntity = {
              password: hash,
              verification_token: "",
              salt,
            };
            
            const credentialsRecord = await UserCredentialsRepository.createUserCredentials(userCredentialsData);
            const user =
            await UserRepository.createUser({
                ...data,
                user_credential:
                credentialsRecord.id as number,
            });
            const verification_token =
              await generateVerificationToken(
                credentialsRecord.id as string
              );

            await UserCredentialsRepository.updateAccountVerificationToken(
              verification_token,
              credentialsRecord.id as string
            );
            await sendVerificationEmail(
              user.attributes.email,
              credentialsRecord.id as string
            );

            return user;
        } catch (error) {
            console.log(error);
            throw Error('Cannot create user');
        }
    }

    async updateUserData(data: UserEntity, id: string) {

        try {
            const userData = (await UserRepository.getUserByEmail(data.email)).data[0];
            if (userData.id != id) {
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