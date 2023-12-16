import UserCredentialsRepository from "../../infrastructure/UserCredentialsRepository";
import UserRepository from "../../infrastructure/UserRepository";
import { UserController } from "../UserController";
import parseCredentialsTokenOrFail from "../helpers/isAuthorized";

const { verifyUser } = new UserController();

export async function validateUserAction(
  credentialUUID: string
) {
  try {
    const credentials =
      await UserCredentialsRepository.getById(
        credentialUUID
      );
    
    const parsedToken =
      await parseCredentialsTokenOrFail(
        credentials.attributes
          .verification_token as string
      );
    
    const user = await UserRepository.getUserById(
      parsedToken.id
    );
    console.log({user});
    
    const result = verifyUser(
      user.data[0].attributes,
      parsedToken.id,
      credentials.attributes
        .verification_token as string
    );

    return {
      result,
      user,
    };
  } catch (error) {
    return {
      result: false
    };
  }
}
