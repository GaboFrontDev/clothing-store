import { UserController } from "../UserController";

const {
  updateUserValidationTokenAndSendEmail,
  checkUserExists,
  getUserByEmail,
} = new UserController();

export async function resendUserTokenAction(
  credentialUUID?: string,
  email?: string
) {
  try {
    if (credentialUUID) {
      const userExists = await checkUserExists(undefined, credentialUUID);
      if (!userExists) {
        throw Error("User doesn't exists");
      }
      await updateUserValidationTokenAndSendEmail(credentialUUID);
    } else if (email) {
      console.log("Checking User exists");
      const user = await (await getUserByEmail(email)).data[0];
      if (!user) {
        throw Error("User doesn't exists");
      }
      console.log({ user: user.attributes.user_credential });
      
      console.log("Sending token");
      
      await updateUserValidationTokenAndSendEmail(
        user.attributes.user_credential.data.attributes.uuid as string
      );
      console.log("Token sent");

    }
  } catch (error) {
    console.log(error);
    
    throw error;
  }
}
