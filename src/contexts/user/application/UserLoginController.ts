import UserRepository from "../infrastructure/UserRepository";
import { createLoginToken, verifyPassword } from "./helpers/tokenUtils";

export class UserLoginController {
    constructor() {
    }

    async login(data: LoginEntity) {
        const user = await UserRepository.getUserByEmail(data.email);
        const verified = await verifyPassword(
            {
                hash: user.password,
                salt: user.salt,
            },
            data.password
        );
        if (!verified) {
            throw Error('authentication failed');
        }
        const token = await createLoginToken({
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            address: user.address,
            phone: user.phone,
            verified: user.verified,
        });
        return token;
    }

}