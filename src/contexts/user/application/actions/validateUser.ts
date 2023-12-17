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
    console.log("Validating user");
    console.log({user});
    
    const result = await verifyUser(
      user.data.attributes,
      parsedToken.id
    );

    console.log({result});
    

    return {
      result,
      user,
    };
  } catch (error) {
    console.log(error);
    
    return {
      result: false
    };
  }
}
