import UserRepository from "../infrastructure/UserRepository";
import {
  createLoginToken,
  verifyPassword,
} from "./helpers/tokenUtils";

export class UserLoginController {
  constructor() {}

  async getLoginTokenOrFail(data: LoginEntity) {
    const user = (
      await UserRepository.getUserByEmail(
        data.email
      )
    ).data[0];
    const credentials =
      user.attributes.user_credential;
    const verified = await verifyPassword(
      {
        hash: credentials.attributes.password,
        salt: credentials.attributes.salt,
      },
      data.password
    );
    if (!verified) {
      throw Error("authentication failed");
    }
    const token = await createLoginToken({
      ...user.attributes,
    });
    return token;
  }
}
