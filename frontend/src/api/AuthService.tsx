import { handleError } from "../helpers/ErrorHandler";
import { UserProfileToken } from "../models/User";
import axios from "axios";

const baseUrl = "http://localhost:8000/api/auth/";

export const loginAPI = async (email: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(baseUrl + "jwt/create/", {
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
        const data = await axios.post<UserProfileToken>(baseUrl + "users/", {
            username: username,
            email: email,
            password: password,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}