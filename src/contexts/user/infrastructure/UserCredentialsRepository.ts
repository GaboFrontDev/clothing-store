import { StrapiRepository } from "@/contexts/shared/infrastructure/StrapiRepository";
import { UserCredentialsEntity } from "../domain/UserEntity";


class UserCredentialsRepositoryClass extends StrapiRepository<UserCredentialsEntity> {
  constructor() {
    super("users-credential");
  }

  async createUserCredentials(data: UserCredentialsEntity) {
    const response = await this.create(JSON.stringify(data))
    return response.data;
  };

  async getUserByEmail(email: string) {
    const response = await this.getSingleItem(email);
    return response.data.attributes;
  }

  async updateAccountVerificationToken(token: string, userId: string) {
    const response = await this.update(JSON.stringify({
      verification_token: token
    }), userId);

    return response;

  }

  async updateAccountData(data: UserCredentialsEntity, id: string) {
    const response = this.update(JSON.stringify(data), id);
    return response;
  }
}

const SuerCredentialsRepository = new UserCredentialsRepositoryClass();
export default SuerCredentialsRepository
