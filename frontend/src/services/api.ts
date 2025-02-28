import axios, { AxiosError } from 'axios';
import { Tenant } from '../types/tenant';

const API_URL = 'http://localhost:8000/api/tenants/';
let accessToken: string | null = localStorage.getItem('accessToken');
let refreshToken: string | null = localStorage.getItem('refreshToken');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': accessToken ? `Bearer ${accessToken}` : '',
  },
});

// Set tokens and update axios headers
export const setAuthTokens = (newAccessToken: string | null, newRefreshToken: string | null) => {
  accessToken = newAccessToken;
  refreshToken = newRefreshToken;
  if (newAccessToken) {
    localStorage.setItem('accessToken', newAccessToken);
    api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete api.defaults.headers['Authorization'];
  }
  if (newRefreshToken) {
    localStorage.setItem('refreshToken', newRefreshToken);
  } else {
    localStorage.removeItem('refreshToken');
  }
};

// Refresh token function
const refreshAccessToken = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/token/refresh/', {
      refresh: refreshToken,
    });
    setAuthTokens(response.data.access, refreshToken);
    return response.data.access;
  } catch (error) {
    setAuthTokens(null, null); // Logout if refresh fails
    throw new Error('Session expired. Please log in again.');
  }
};

// Axios interceptor for handling 401 errors
api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const getTenants = async (): Promise<Tenant[]> => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tenants');
  }
};

export const createTenant = async (tenant: Omit<Tenant, 'id' | 'created_at'>): Promise<Tenant> => {
  try {
    const response = await api.post('', tenant);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create tenant');
  }
};

export const updateTenant = async (id: number, tenant: Partial<Tenant>): Promise<Tenant> => {
  try {
    const response = await api.put(`${id}/`, tenant);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update tenant');
  }
};

export const deleteTenant = async (id: number): Promise<void> => {
  try {
    await api.delete(`${id}/`);
  } catch (error) {
    throw new Error('Failed to delete tenant');
  }
};

export const login = async (username: string, password: string): Promise<void> => {
  try {
    const response = await axios.post('http://localhost:8000/api/token/', { username, password });
    setAuthTokens(response.data.access, response.data.refresh);
  } catch (error) {
    throw new Error('Login failed');
  }
};