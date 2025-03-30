import { api } from "./_base";
import { handleError } from "../helpers/ErrorHandler";
import { PropertyGet, PropertyPost, Facility } from "../models/Property";

const baseUrl = `${api}/properties`;

export const propertyAddAPI = async () => {
    try {
        const data = await api.post<PropertyPost>(baseUrl);
        return data;      
    } catch (error) {
        handleError(error);
    }
};

export const propertyGetOneAPI = async (id: number) => {
    try {
        const data = await api.get<PropertyGet>(`${baseUrl}/${id}`);
        return data;  
    } catch (error) {
        handleError(error);
    }
};

export const propertyGetAPI = async () => {
    try {
        const data = await api.get<PropertyGet[]>(baseUrl);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const propertyDeleteAPI = async (id: number) => {
    try {
        const data = await api.delete<PropertyGet>(`${baseUrl}/${id}`);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const facilityAddAPI = async () => {
    try {
        const data = await api.post<Facility>(baseUrl + 'facilities');
        return data;
    } catch (error) {
        handleError(error);
    }
};