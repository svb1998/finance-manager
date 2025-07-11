import { AxiosError } from "axios";
import axiosPrivate from "../../../../../interceptors/PrivateAxios.interceptor";

export const findMembersByQuery = async (
    query: string,
    excludedMemberIds: string[]
) => {
    if (!query) return [];

    let endpoint = `/groups/find-members?query=${query}`;

    if (excludedMemberIds.length > 0) {
        endpoint += `&excludedMembers=${excludedMemberIds.join(",")}`;
    }

    try {
        const response = await axiosPrivate.get(endpoint);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        const message =
            axiosError.response?.data?.error || "Error. Inténtalo más tarde.";
        throw new Error(message);
    }
};
