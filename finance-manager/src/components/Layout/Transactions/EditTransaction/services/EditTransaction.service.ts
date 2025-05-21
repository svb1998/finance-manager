import { AxiosError } from "axios";
import axiosPrivate from "../../../../../interceptors/PrivateAxios.interceptor";

export const editTransaction = async (formData) => {
    // const { category, ...rest } = formData;

    // const transaction = { ...rest, categoryId: category };

    const { category, ...rest } = formData;

    const categoryId =
        typeof category === "string" ? category : category.categoryId;

    const transaction = {
        ...rest,
        categoryId: categoryId,
    };

    try {
        const response = await axiosPrivate.put(
            `/transactions/update`,
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
