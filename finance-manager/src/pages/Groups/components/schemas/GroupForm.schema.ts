import * as yup from "yup";

export const groupFromSchema = yup.object({
    name: yup.string().required("Debes asignarle un nombre al grupo"),
    description: yup.string(),
});
