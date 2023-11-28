import { UserUpdatePasswordEntity } from "../domain/UserUpdatePasswordEntity";
import { authMiddleware } from "@/decorators/authorized";
import UserRepository from "../infrastructure/UserRepository";

export class UserResetPasswordController<Request> {
    constructor() {
    }

    @authMiddleware
    async updateUserPassword(req: Request, data: UserUpdatePasswordEntity) {

    }

    async handleResetUserPassword(email: string) {
        try {
            const user = await UserRepository.getUserByEmail(email);
            
        } catch (error) {
            
        }
    }

    private async sendRestorePasswordEmail() {
        
    }
}