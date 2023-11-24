export interface UserEntity extends UserPayloadEntity {
    password: string,
    salt: string,
    verification_token?: string
    id: string,
    
}
export interface UserPayloadEntity { 
    first_name: string,
    last_name: string,
    address: string,
    phone: string
    verified: boolean,
    email: string,
}