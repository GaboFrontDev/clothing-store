import { StrapiRepository } from "@/contexts/shared/infrastructure/StrapiRepository";
import {
  UserEntity,
  UserStrapiPayloadEntity,
} from "../domain/UserEntity";

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
      return await this.get(`?populate=*&filters[email][$eq]=${email}`);
    } catch(error) {
      return {data: []}
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
    data: UserEntity,
    id: string
  ) {
    const response = this.update(
      JSON.stringify(data),
      id
    );
    return response;
  }
}

const UserRepository = new UserRepositoryClass();
export default UserRepository;
