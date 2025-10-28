import axios from "axios";

export const backendURL = import.meta.env.VITE_BACKEND_URL;
export const SOCKET_BACKEND_URL = import.meta.env.VITE_SOCKET_BACKEND_URL;


export const api = axios.create({
    baseURL: backendURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const FALBACK_USER_IMAGE = 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png';