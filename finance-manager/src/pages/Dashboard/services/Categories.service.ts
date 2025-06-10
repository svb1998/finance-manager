import { AxiosError } from "axios";
import axiosPrivate from "../../../interceptors/PrivateAxios.interceptor";

export const getAllCategories = async () => {
    try {
        const response = await axiosPrivate.get("/categories");
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        const message =
            axiosError.response?.data?.error || "Error. Inténtalo más tarde.";
        throw new Error(message);
    }
};
