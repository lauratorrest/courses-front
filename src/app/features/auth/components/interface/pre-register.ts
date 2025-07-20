export interface RegisterRequest {
    email: string;
    confirmEmail: string;
    fullName: string;
    password: string;
}

export interface RegisterResponse {
    email: string;
    fullName: string;
    token: string;
}
