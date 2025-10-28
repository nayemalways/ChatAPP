import axios from "axios";

export const backendURL = import.meta.env.VITE_BACKEND_URL;


export const api = axios.create({
    baseURL: backendURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})