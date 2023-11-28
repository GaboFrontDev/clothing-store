import { StrapiRepository } from "@/contexts/shared/infrastructure/StrapiRepository";
import { UserEntity, UserPayloadEntity } from "../domain/UserEntity";


class UserRepositoryClass extends StrapiRepository<UserEntity> {
  constructor() {
    super("users");
  }

  async createUser(data: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    const response = await this.create(JSON.stringify(data))
    return response.data.attributes;
  };

  async getUserByEmail(email: string): Promise<UserEntity> {
    const response = await this.getSingleItem(email);
    return response.data.attributes;
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
