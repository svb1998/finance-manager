import axios from "axios";
import { removeLocalStorage } from "../utilities/localStorage.utility";

const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/api",
});

axiosPrivate.interceptors.request.use((config) => {
    const token = localStorage.getItem("fm_tk");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosPrivate.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            removeLocalStorage("fm_tk");
            window.location.href = "/login";
        }

        if (error.response?.status >= 500) {
            console.error("Error del servidor. Intenta más tarde.");
        }

        if (error.message === "Network Error" || !error.response) {
            console.error(
                "No se puede conectar con el servidor. Intenta más tarde."
            );
        }

        if (error.code === "ECONNABORTED") {
            console.error("El servidor está tardando demasiado en responder.");
        }

        return Promise.reject(error);
    }
);

export default axiosPrivate;
