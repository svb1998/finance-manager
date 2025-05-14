import { AxiosError } from "axios";
import axiosPrivate from "../../../interceptors/PrivateAxios.interceptor";
import { Group } from "../../../models/group.model";

interface GroupFormData {
    name: string;
    description?: string;
    created_by: string;
}

export const addGroup = async (formData: Group, creatorUUID: string) => {
    const body: GroupFormData = {
        name: formData.name,
        description: formData.description,
        created_by: creatorUUID,
    };

    try {
        const response = await axiosPrivate.post(`/groups/create`, body);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        const message =
            axiosError.response?.data?.error || "Error. Inténtalo más tarde.";
        throw new Error(message);
    }
};

export const getGroups = async (profileUUID: string) => {
    try {
        console.log("PROFILE UUID", profileUUID);
        const response = await axiosPrivate.get(`/groups/${profileUUID}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        const message =
            axiosError.response?.data?.error || "Error. Inténtalo más tarde.";
        throw new Error(message);
    }
};
