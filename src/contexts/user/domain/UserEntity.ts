export interface UserEntity {
    password: string,
    email: string,
    salt: string,
    first_name: string,
    last_name: string,
    address: string,
    phone: string
    verified: boolean,
    id: string,
    verification_token?: string
}
