import { AxiosError } from "axios";
import axiosPrivate from "../../../../../../../interceptors/PrivateAxios.interceptor";

export const findMembersByQuery = async (query: string) => {
    if (!query) return [];

    try {
        const response = await axiosPrivate.get(
            `/groups/find-members?query=${query}`
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        const message =
            axiosError.response?.data?.error || "Error. Inténtalo más tarde.";
        throw new Error(message);
    }
};
