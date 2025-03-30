import { api } from "./_base";
import { handleError } from "../helpers/ErrorHanlder";
import { TenantGet, TenantPost } from "../models/Tenant";

const baseUrl = `${api}/tenants`;

export const tenantAddAPI = async () => {
    try {
        const data = await api.post<TenantPost>(baseUrl);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const tenantDeleteAPI = async (id: number) => {
    try {
        const data = await api.delete<TenantGet>(`${baseUrl}/${id}`);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const tenantGetAPI = async () => {
    try {
        const data = await api.get<TenantGet[]>(baseUrl);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const tenantGetOneAPI = async (id: number) => {
    try {
        const data = await api.get<TenantGet>(`${baseUrl}/${id}`);
        return data;
    } catch (error) {
        handleError(error);
    }
}