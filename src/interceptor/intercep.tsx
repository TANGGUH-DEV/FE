import axios from "axios";

// Instance axios global
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // ganti pakai .env
  // baseURL: process.env.REACT_APP_BASE_URL, // kalau pakai CRA
});

// Interceptor dasar (tanpa token otomatis)
api.interceptors.request.use(
  (config) => {
    console.log(`[${config.method?.toUpperCase()}] ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
