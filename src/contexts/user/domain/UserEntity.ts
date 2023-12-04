import { StrapiEntryEntity } from "@/contexts/shared/domain/StrapiEntity"

export interface UserCredentialsEntity {
    password: string,
    salt: string,
    verification_token?: string
    user_account: StrapiEntryEntity<UserPayloadEntity> | string | number
}
export interface UserPayloadEntity {
    first_name: string,
    last_name: string,
    address: string,
    phone: string
    verified: boolean,
    email: string,
}