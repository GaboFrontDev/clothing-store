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

  async updateAccountVerificationToken(token: string, credentialId: string) {
    const payload = JSON.stringify({
      data: { verification_token: token },
    });
    const response = await this.update(
      payload,
      credentialId
    );

    return response;

  }

  async updateAccountData(data: UserCredentialsEntity, id: string) {
    const response = this.update(JSON.stringify(data), id);
    return response;
  }

  async getById(uuid: string) {
    return (
      await this.getByQuery(`?populate=*&filter=[uuid][$eq]=${uuid}`)
    ).data[0];
  }
}

const UserCredentialsRepository = new UserCredentialsRepositoryClass();
export default UserCredentialsRepository;
