import UserCredentialsRepository from "../../infrastructure/UserCredentialsRepository";
import UserRepository from "../../infrastructure/UserRepository";
import { UserController } from "../UserController";
import parseCredentialsTokenOrFail from "../helpers/isAuthorized";

const { verifyUser } = new UserController();

export async function validateUserAction(
  credentialId: string
) {
  try {
    const credentials =
      await UserCredentialsRepository.getById(
        credentialId
      );
    const parsedToken =
      await parseCredentialsTokenOrFail(
        credentials.attributes
          .verification_token as string
      );
    const user = await UserRepository.getUserById(
      parsedToken.user_id
    );
    const result = verifyUser(
      user.data[0].attributes,
      parsedToken.user_id,
      credentials.attributes
        .verification_token as string
    );

    return {
      result,
      user,
    };
  } catch (error) {
    throw error;
  }
}
