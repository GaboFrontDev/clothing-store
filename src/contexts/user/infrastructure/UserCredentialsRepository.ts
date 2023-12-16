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
    const payload = JSON.stringify({
      data: { verification_token: token },
    });
    const response = await this.update(
      payload,
      userId
    );

    return response;

  }

  async updateAccountData(data: UserCredentialsEntity, id: string) {
    const response = this.update(JSON.stringify(data), id);
    return response;
  }

  async getById(id: string) {
    return (
      await this.getByQuery(`/${id}?populate=*`)
    ).data[0];
  }
}

const UserCredentialsRepository = new UserCredentialsRepositoryClass();
export default UserCredentialsRepository;
