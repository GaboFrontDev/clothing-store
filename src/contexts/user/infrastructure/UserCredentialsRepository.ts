import { StrapiRepository } from "@/contexts/shared/infrastructure/StrapiRepository";
import { UserCredentialsEntity, UserCredentialsPayloadEntity } from "../domain/UserEntity";


class UserCredentialsRepositoryClass extends StrapiRepository<UserCredentialsEntity> {
  constructor() {
    super("user-credential");
  }

  async createUserCredentials(data: UserCredentialsPayloadEntity) {
    const response = await this.create(
      JSON.stringify({ data })
    );
    return response.data;
  };

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

const UserCredentialsRepository = new UserCredentialsRepositoryClass();
export default UserCredentialsRepository;
