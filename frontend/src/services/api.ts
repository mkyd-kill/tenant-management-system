import axios from "axios";
import { Tenant } from "../types/tenant";

const API_URL = 'http://localhost:8000/api/tenants/';

export const getTenants = async (): Promise<Tenant[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createTenant = async (tenant: Omit<Tenant, 'id' | 'created_at'>): Promise<Tenant> => {
    const response = await axios.post(API_URL, tenant);
    return response.data;
};

export const updateTenant = async (id: number, tenant: Partial<Tenant>): Promise<Tenant> => {
    const response = await axios.put(`${API_URL}${id}/`, tenant);
    return response.data;
};

export const deleteTenant = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}${id}/`);
};