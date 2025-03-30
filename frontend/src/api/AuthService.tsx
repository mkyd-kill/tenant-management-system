import { api } from "./_base";
import { handleError } from "../helpers/ErrorHanlder";
import { UserProfileToken } from "../models/User";

const baseUrl = `${api}/auth`;

export const loginAPI = async (email: string, password: string) => {
    try {
        const data = await api.post<UserProfileToken>(baseUrl + "jwt/create/", {
            email: email,
            password: password,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const registerAPI = async (username: string, email: string, password: string) => {
    try {
        const data = await api.post<UserProfileToken>(baseUrl + "users/", {
            username: username,
            email: email,
            password: password,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}