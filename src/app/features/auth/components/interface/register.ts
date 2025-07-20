export interface RegisterRequest {
    email: string;
    confirmEmail: string;
    fullName: string;
    password: string;
    role: UserRole;
}

export enum UserRole {
    ADMIN, USER, TEACHER, MODERATOR, GUEST
}

export interface RegisterResponse {
    email: string;
    fullName: string;
    token: string;
}
