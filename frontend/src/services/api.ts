import axios from "axios";
import { Tenant } from "../types/tenant";

const API_URL = "http://localhost:8000/api/tenants/";
let token: string | null = localStorage.getItem("token");

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export const setAuthToken = (newToken: string | null) => {
  token = newToken;
  if (newToken) {
    localStorage.setItem("token", newToken);
    api.defaults.headers["Authorization"] = `Bearer ${newToken}`;
  } else {
    localStorage.removeItem("token");
    delete api.defaults.headers["Authorization"];
  }
};

// Fetching data from the backend url
// Using simple CRUD operations
export const getTenants = async (): Promise<Tenant[]> => {
  try {
    const response = await api.get("");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch tenants");
  }
};

export const createTenant = async (
  tenant: Omit<Tenant, "id" | "created_at">
): Promise<Tenant> => {
  try {
    const response = await api.post("", tenant);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create tenant");
  }
};

export const updateTenant = async (
  id: number,
  tenant: Partial<Tenant>
): Promise<Tenant> => {
  try {
    const response = await api.put(`${id}/`, tenant);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update tenant");
  }
};

export const deleteTenant = async (id: number): Promise<void> => {
  try {
    await api.delete(`${id}/`);
  } catch (error) {
    throw new Error("Failed to delete tenant");
  }
};

export const login = async (
  username: string,
  password: string
): Promise<void> => {
  try {
    const response = await axios.post("http://localhost:8000/api/token/", {
      username,
      password,
    });
    setAuthToken(response.data.access);
  } catch (error) {
    throw new Error("Login failed");
  }
};