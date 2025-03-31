import axios from "axios";

const api_url = "http://localhost:8000/api"

export const api = axios.create({
    baseURL: api_url,
    headers: {
        'Content-Type': 'application/json'
    }
});