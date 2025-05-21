import { AxiosError } from "axios";
import axiosPrivate from "../../../../../interceptors/PrivateAxios.interceptor";

export const addTransaction = async (formData) => {
    const { category, ...rest } = formData;

    const transaction = { ...rest, categoryId: category };

    try {
        const response = await axiosPrivate.post(
            `/transactions/create`,
            transaction
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        const message =
            axiosError.response?.data?.error || "Error. Inténtalo más tarde.";
        throw new Error(message);
    }
};
