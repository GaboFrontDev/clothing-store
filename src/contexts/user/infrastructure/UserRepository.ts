import { StrapiRepository } from "@/contexts/shared/infrastructure/StrapiRepository";
import { UserPayloadEntity } from "../domain/UserEntity";
import { StrapiSingleItemResponseEntity } from "@/contexts/shared/domain/StrapiSingleItemResponseEntity";


class UserRepositoryClass extends StrapiRepository<UserPayloadEntity> {
  constructor() {
    super("user");
  }

  async createUser(data: UserPayloadEntity) {
    const response = await this.create(JSON.stringify(data))
    return response.data;
  };

  async getUserByEmail(email: string): Promise<StrapiSingleItemResponseEntity<UserPayloadEntity>> {
    return await this.getSingleItem(email);;
  }

  async updateAccountVerificationToken(token: string, userId: string) {
    const response = await this.update(JSON.stringify({
      verification_token: token
    }), userId);

    return response;

  }

  async updateAccountData(data: UserPayloadEntity, id: string) {
    const response = this.update(JSON.stringify(data), id);
    return response;
  }
}

const UserRepository = new UserRepositoryClass();
export default UserRepository
