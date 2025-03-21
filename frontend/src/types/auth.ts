export interface AuthCredentials {
    email: string;
    password: string;
    username?: string;
}

export interface AuthResponse {
    access: string;
    refresh: string;
}

export interface User {
    email: string;
    username: string;
}