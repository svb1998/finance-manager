import { AxiosError } from "axios";
import axiosPrivate from "../../../interceptors/PrivateAxios.interceptor";

export const getAllTransactions = async (profileUUID: string) => {
    try {
        const response = await axiosPrivate.get(`/transactions/${profileUUID}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        const message =
            axiosError.response?.data?.error || "Error. Inténtalo más tarde.";
        throw new Error(message);
    }
};

export const removeTransaction = async (transactionId: string) => {
    console.log("TXid", transactionId);

    try {
        const response = await axiosPrivate.delete(
            `/transactions/remove/${transactionId}`
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        const message =
            axiosError.response?.data?.error || "Error. Inténtalo más tarde.";
        throw new Error(message);
    }
};
