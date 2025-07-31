import api from "@/server/api";
import { AuthTokens } from "@/type/model";

export const loginAPI = async (email: string, password: string) => {
    try {
        const res = await api.post<AuthTokens>("/auth/jwt/create", {
            email,
            password,
        });
        return res;
    } catch {
        throw new Error("Failed to login user");
    }
};

export const registerAPI = async (username: string, email: string, password: string) => {
    try {
        const res = await api.post("/auth/users/", { username, email, password});
        return res;
    } catch {
        throw new Error("Failed to register user");
    }
}