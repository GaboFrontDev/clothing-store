export interface UserUpdatePasswordEntity{
    previousPassword: string,
    repeatUserPassword: string,
    newPassword: string,
    emailVerificationToken: string,
}