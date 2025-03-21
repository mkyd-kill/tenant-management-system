import axios from 'axios';
import { AuthCredentials, AuthResponse, Property, Tenant } from '../types';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
});

export const login = (credentials: AuthCredentials) =>
    api.post<AuthResponse>('/auth/jwt/create/', credentials);

export const signup = (credentials: AuthCredentials) =>
    api.post('/auth/users/', credentials);

export const getProperties = (token: string) =>
    api.get<Property[]>('/properties/', {headers: {Authorization: `Bearer ${token}`}});

export const getTenants = (token: string) =>
    api.get<Tenant[]>('/tenants/', {headers: {Authorization: `Bearer ${token}`}});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});