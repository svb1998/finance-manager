import "../Transaction.css";
import MainInput from "../../../Input/MainInput/MainInput";
import { Select } from "antd";
import FieldLayout from "../../FieldLayout/FieldLayout";
import MainButton from "../../../Button/MainButton/MainButton";
import OutlineButton from "../../../Button/OutlineButton/OutlineButton";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import BasicFieldController from "../../../FieldControllers/BasicFieldController/BasicFieldController";
import { transactionEditFormSchema } from "../schemas/TransactionForm.schema";
import { useDispatch, useSelector } from "react-redux";

import { Transaction } from "../../../../models";
import { Category } from "../../../../models/category.model";
import { editTransaction } from "./services/EditTransaction.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const { Option } = Select;

interface Props {
    onCloseModal: () => void;
    transaction: Transaction;
}

export default function EditTransaction({ onCloseModal, transaction }: Props) {
    const queryClient = useQueryClient();

    const dispatch = useDispatch();

    const categories: Category[] = useSelector((state) => state.category);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: transaction,
        mode: "onChange",
        resolver: yupResolver(transactionEditFormSchema),
    });

    const {
        mutate: handleSubmitMutation,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useMutation({
        mutationFn: (formData: Transaction) => {
            return onSubmit(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["transactions"]);
            onCloseModal();
        },
    });

    const onSubmit = async (formData: Transaction) => {
        const result = await editTransaction(formData);

        return result;
    };

    return (
        <div className="form-transaction-container">
            <form onSubmit={handleSubmit(handleSubmitMutation)}>
                <FieldLayout>
                    <BasicFieldController
                        name="type"
                        control={control}
                        defaultValue={transaction.type}
                    >
                        {(field) => (
                            <Select
                                {...field}
                                className="select-container"
                                placeholder="Seleccionar tipo de transacción"
                                aria-errormessage={errors.type?.message}
                            >
                                <Option value="income">
                                    <div className="option-container">
                                        Ingreso
                                    </div>
                                </Option>
                                <Option value="expense">
                                    <div className="option-container">
                                        Gasto
                                    </div>
                                </Option>
                            </Select>
                        )}
                    </BasicFieldController>
                </FieldLayout>
                <FieldLayout>
                    <BasicFieldController
                        name="amount"
                        control={control}
                        defaultValue={transaction.amount}
                    >
                        {(field) => (
                            <MainInput
                                {...field}
                                type="number"
                                name="amount"
                                placeholder="Cantidad... (€)"
                                error={errors.amount !== undefined}
                                errorMessage={errors.amount?.message}
                            />
                        )}
                    </BasicFieldController>
                </FieldLayout>
                <FieldLayout>
                    {" "}
                    <BasicFieldController
                        name="description"
                        control={control}
                        defaultValue={transaction.description}
                    >
                        {(field) => (
                            <MainInput
                                {...field}
                                name="description"
                                type="text"
                                placeholder="Descripción..."
                            />
                        )}
                    </BasicFieldController>
                </FieldLayout>
                <FieldLayout>
                    {" "}
                    <BasicFieldController
                        name="category"
                        control={control}
                        defaultValue={transaction.category.categoryId}
                    >
                        {(field) => (
                            <Select
                                {...field}
                                className="select-container"
                                id="transaction-category"
                                placeholder="Selecciona una categoría..."
                            >
                                {categories.map((category) => (
                                    <Option
                                        key={category.categoryId}
                                        value={category.categoryId}
                                    >
                                        <div className="option-container">
                                            <div
                                                className="option-color-tag"
                                                style={{
                                                    backgroundColor:
                                                        category.backgroundColor,
                                                }}
                                            >
                                                {" "}
                                            </div>
                                            {category.label}
                                        </div>
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </BasicFieldController>
                </FieldLayout>
                <FieldLayout>
                    <BasicFieldController
                        name="notes"
                        control={control}
                        defaultValue={transaction.notes ?? ""}
                    >
                        {(field) => (
                            <MainInput
                                {...field}
                                name="notes"
                                type="text"
                                placeholder="Notas.."
                            />
                        )}
                    </BasicFieldController>
                </FieldLayout>

                <div className="form-transaction-buttons-container">
                    <OutlineButton type="button" onClick={onCloseModal}>
                        Cancelar
                    </OutlineButton>
                    <MainButton
                        type="submit"
                        // onClick={() => {
                        //     console.log("Clicaste");
                        // }}
                    >
                        Guardar
                    </MainButton>
                </div>
            </form>
        </div>
    );
}
