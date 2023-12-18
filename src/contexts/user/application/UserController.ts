import { UserCredentialsPayloadEntity, UserEntity, UserPayloadEntity } from "../domain/UserEntity";
import { generateAuthenticationToken, generateHashPassword, generateVerificationToken } from "./helpers/tokenUtils";
import { emailResponseHandler, isEmailValid } from "./helpers/emailExists";
import UserRepository from "../infrastructure/UserRepository";
import UserCredentialsRepository from "../infrastructure/UserCredentialsRepository";
import { sendVerificationEmail } from "../application/helpers/emailUtils";
import parseCredentialsTokenOrFail from "./helpers/isAuthorized";
import { randomUUID } from "crypto";
import { UserExistsError } from "@/utils/errors/UserExistsError";
import { UserNotVerifiedError } from "@/utils/errors/UserNotVerified";

export class UserController {
    constructor() {
    }

    async checkUserExists(userId?: string, credentialUUID?: string) {
      let user = null;
      if(userId){
        user = (
          await UserRepository.getUserById(userId)
        ).data;
      } else if(credentialUUID) {
        user = (await UserRepository.getUserByCredentialId(credentialUUID)).data.length > 0;
      }
      return !!user;
    }

    async createUser(data: UserPayloadEntity, passwordData: string) {
        try {
            const development = process.env["NODE_ENV"] == "development";
            const existingUser = (await UserRepository.getUserByEmail(data.email)).data;

            if(existingUser){
                console.log("User already exits");
                
                if(!existingUser[0].attributes.verified) {
                  console.log("User not verified");
                  throw new UserNotVerifiedError(
                    "Cannot create user, user exists but not verified"
                  );
                }
                throw new UserExistsError("User already exists error"); 
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
              uuid: randomUUID()
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
              credentialsRecord.attributes
                .uuid as string
            );

            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateUserValidationTokenAndSendEmail(credentialId: string){
      try {
        const credentialsRecord = await UserCredentialsRepository.getById(credentialId);
        const userRecord = (
          await UserRepository.getUserByCredentialId(
            credentialId
          )
        ).data[0];
        if(userRecord.attributes.verified) {
          throw Error("User already verified, send to login");
        }
  
        const verification_token =
        await generateVerificationToken(
          userRecord.id as string
        );
          
        await UserCredentialsRepository.updateAccountVerificationToken(
          verification_token,
          credentialsRecord.id as string
        );

        await sendVerificationEmail(
          userRecord.attributes.email,
          credentialsRecord.attributes
            .uuid as string
        );

        
      } catch (error) {
        console.log(error);
        
        throw error
      }
    }

    async verifyUser(data: UserEntity, id: string) {
      console.log({data, id});
      
      try {
        // challenge token...
        console.log("User validation started");
        
        await UserRepository.updateAccountData(
          { verified: true },
          id
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
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

    async getUserByEmail(email:string) {
      return await UserRepository.getUserByEmail(email);
    }
}