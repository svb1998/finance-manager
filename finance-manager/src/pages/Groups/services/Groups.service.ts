import { AxiosError } from "axios";
import axiosPrivate from "../../../interceptors/PrivateAxios.interceptor";
import { Group } from "../../../models/group.model";

interface GroupFormData {
    name: string;
    description?: string;
    creatorUUID: string;
}

export const addGroup = async (formData: Group, creatorUUID: string) => {
    console.log("FD", formData);
    console.log("CUID", creatorUUID);

    const body: GroupFormData = {
        name: formData.name,
        description: formData.description,
        creatorUUID: creatorUUID,
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
