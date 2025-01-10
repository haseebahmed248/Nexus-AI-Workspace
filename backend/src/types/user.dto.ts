
export interface CreateUserDTO{
    email: string,
    password: string,
    name? : string,
    role? : UserRole
}

export enum UserRole{
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface ResetPassword{
    email?: string,
    password?: string
}