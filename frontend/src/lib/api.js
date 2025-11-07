// axios client with VITE baseURL and token handling
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8001/api",
    headers: {
        Accept: "application/json",
    },
});

// request interceptor to attach token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// response interceptor to centralized error handling (optional)
api.interceptors.response.use(
    (res) => res,
    (err) => {
        // if 401, you may want to clear token or redirect to login
        return Promise.reject(err);
    }
);

export default api;
