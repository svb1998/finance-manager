import * as yup from "yup";

export const transactionAddFormSchema = yup.object({
    type: yup
        .string()
        .oneOf(["income", "expense"])
        .required("Selecciona un tipo de transacción."),
    amount: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === "" ? undefined : value
        )
        .positive("La cantidad debe ser positiva.")
        .required("Debes introducir una cantidad"),
    description: yup.string(),
    category: yup.string().required("Selecciona una categoría"),
    notes: yup.string(),
});

export const transactionEditFormSchema = yup.object({
    type: yup
        .string()
        .oneOf(["income", "expense"])
        .required("Selecciona un tipo de transacción."),
    amount: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === "" ? undefined : value
        )
        .positive("La cantidad debe ser positiva.")
        .required("Debes introducir una cantidad"),
    description: yup.string(),

    notes: yup.string(),
});
