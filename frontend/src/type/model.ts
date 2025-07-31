export interface AuthTokens {
    access: string;
    refresh: string;
};

export interface UserProfile {
    ID: number;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
};