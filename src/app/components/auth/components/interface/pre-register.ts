export interface PreRegisterRequest {
    email: string;
    confirmEmail: string;
    fullName: string;
}

export interface PreRegisterResponse {
    email: string;
    fullName: string;
}
