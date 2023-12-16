import { UserController } from "../UserController";

const { updateUserValidationTokenAndSendEmail, checkUserExists } =
  new UserController();

export async function resendUserTokenAction (credentialUUID: string) {
    try {
        const userExists = await checkUserExists(
          undefined,
          credentialUUID
        );
        if(!userExists) {
            throw Error("User doesn't exists");
        }
        await updateUserValidationTokenAndSendEmail(credentialUUID);
    } catch (error) {
        throw error;
    }
} 