import { AxiosError } from "axios";
import axiosPublic from "../../interceptors/PublicAxios.interceptor";

interface LoginData {
    email: string;
    password: string;
}

export const login = async (formData: LoginData) => {
    try {
        const response = await axiosPublic.post(`/auth/login`, {
            email: formData.email,
            password: formData.password,
        });

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        const message =
            axiosError.response?.data?.error || "Error. Inténtalo más tarde.";
        throw new Error(message);
    }
};
