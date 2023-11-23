import { StrapiRepository } from "@/contexts/shared/infrastructure/StrapiRepository";
import { UserEntity } from "../domain/UserEntity";
import { sendVerificationEmail } from "../application/helpers/emailUtils";


class UserRepositoryClass extends StrapiRepository<UserEntity> {
  constructor() {
    super("users");
  }

  async createUser(data: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    const response = this.create(JSON.stringify(data))
    return response;
  };

  async getUserByEmail(email: string): Promise<UserEntity> {
    const response = await this.getByQuery(email);
    return response;
  }

  async updateAccountVerificationToken(token: string, userId: string) {
    const response = await this.update(JSON.stringify({
      verification_token: token
    }), userId);

    return response;

  }

  async sendVerificationEmail(email: string, token: string) {
    return await sendVerificationEmail(email, token);
  }

}

const UserRepository = new UserRepositoryClass();
export default UserRepository
