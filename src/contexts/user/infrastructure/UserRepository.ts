import { StrapiRepository } from "@/contexts/shared/infrastructure/StrapiRepository";
import {
  UserEntity,
  UserStrapiPayloadEntity,
} from "../domain/UserEntity";
import { StrapiSingleItemResponseEntity } from "@/contexts/shared/domain/StrapiSingleItemResponseEntity";
import { UserExistsError } from "@/utils/errors/UserExistsError";

class UserRepositoryClass extends StrapiRepository<UserEntity> {
  constructor() {
    super("user-account");
  }

  async createUser(
    data: UserStrapiPayloadEntity
  ) {
    const payload = JSON.stringify({ data });

    console.log(
      `Creating user with payload: ${payload}`
    );

    const response = await this.create(payload);
    return response.data;
  }

  async getUserByEmail(email: string) {
    try {
      return await this.get(
        `?populate=*&filters[email][$eq]=${email}`
      );
    } catch (error) {
      throw new UserExistsError();
    }
  }

  async getUserByCredentialId(
    credentialId: string
  ) {
    try {
      return await this.get(
        `?populate=*&filter[credential][id][$eq]=${credentialId}`
      );
    } catch (error) {
      return { data: [] };
    }
  }

  async getUserById(id: string) {
    try {
      return await this.getSingleItem(
        `/${id}?populate=*`
      );
    } catch (error) {
      throw error;
    }
  }

  async updateAccountVerificationToken(
    token: string,
    userId: string
  ) {
    const response = await this.update(
      JSON.stringify({
        verification_token: token,
      }),
      userId
    );

    return response;
  }

  async updateAccountData(
    data: UserEntity | any,
    id: string
  ) {
    const response = await this.update(
      JSON.stringify({ data }),
      id
    );
    return response;
  }
}

const UserRepository = new UserRepositoryClass();
export default UserRepository;
