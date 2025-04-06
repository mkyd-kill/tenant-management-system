export type UserProfileToken = {
    userName: string;
    email: string;
    access: string;
    refresh: string;
};

export type UserProfile = {
    userName: string;
    email: string;
};

export type UserRegisterProfile = {
    userName: string;
    email: string;
    password: string;
}