import axios from "axios";
import { handleError } from "../helpers/ErrorHanlder";
import { TenantGet, TenantPost } from "../models/Tenant";

const baseUrl = "http://localhost:8000/api/tenants";

export const tenantAddAPI = async () => {
    try {
        const data = await axios.post<TenantPost>(baseUrl);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const tenantDeleteAPI = async (id: number) => {
    try {
        const data = await axios.delete<TenantPost>(`baseUrl/${id}`);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const tenantGetAPI = async () => {
    try {
        const data = await axios.get<TenantGet[]>(baseUrl);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const tenantGetOneAPI = async (id: number) => {
    try {
        const data = await axios.get<TenantGet>(`baseUrl/${id}`);
        return data;
    } catch (error) {
        handleError(error);
    }
}