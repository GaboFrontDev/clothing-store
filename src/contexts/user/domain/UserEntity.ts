import { StrapiEntryEntity } from "@/contexts/shared/domain/StrapiEntity"

export interface UserCredentialsPayloadEntity {
    password: string,
    salt: string,
    verification_token?: string
}

export interface UserCredentialsEntity {
    password: string,
    salt: string,
    verification_token?: string
}
export interface UserEntity {
    first_name: string,
    last_name: string,
    address: string,
    phone: string
    verified: boolean,
    email: string,
    user_credential: StrapiEntryEntity<UserCredentialsEntity>
}

export interface UserPayloadEntity
  extends Omit<UserEntity, "user_credential"> {}

  export interface UserStrapiPayloadEntity
  extends Omit<UserEntity, "user_credential"> {
    user_credential: number;
  }