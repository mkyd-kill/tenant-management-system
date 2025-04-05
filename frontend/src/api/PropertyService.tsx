import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
import { PropertyGet, PropertyPost, Facility } from "../models/Property";

const baseUrl = "http://localhost:8000/api/properties/";

export const propertyAddAPI = async () => {
    try {
        const data = await axios.post<PropertyPost>(baseUrl);
        return data;      
    } catch (error) {
        handleError(error);
    }
};

export const propertyGetOneAPI = async (id: number) => {
    try {
        const data = await axios.get<PropertyGet>(`${baseUrl}/${id}`);
        return data;  
    } catch (error) {
        handleError(error);
    }
};

export const propertyGetAPI = async () => {
    try {
        const data = await axios.get<PropertyGet[]>(baseUrl);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const propertyDeleteAPI = async (id: number) => {
    try {
        const data = await axios.delete<PropertyGet>(`${baseUrl}/${id}`);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const facilityAddAPI = async () => {
    try {
        const data = await axios.post<Facility>(baseUrl + 'facilities');
        return data;
    } catch (error) {
        handleError(error);
    }
};