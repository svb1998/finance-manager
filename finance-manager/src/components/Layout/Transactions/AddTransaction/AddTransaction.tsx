import "../Transaction.css";
import MainInput from "../../../Input/MainInput/MainInput";
import { Select } from "antd";
import FieldLayout from "../../FieldLayout/FieldLayout";
import MainButton from "../../../Button/MainButton/MainButton";
import OutlineButton from "../../../Button/OutlineButton/OutlineButton";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import BasicFieldController from "../../../FieldControllers/BasicFieldController/BasicFieldController";
import { transactionFormSchema } from "../schemas/TransactionForm.schema";
import { useDispatch, useSelector } from "react-redux";
import shortUUID from "short-uuid";
import { addTransaction } from "../../../../redux/states/transaction";
import { Transaction } from "../../../../models";
import { Category } from "../../../../models/category.model";

import { motion } from "motion/react";

const { Option } = Select;

interface Props {
    onCloseModal: () => void;
}

export default function AddTransaction({ onCloseModal }: Props) {
    const dispatch = useDispatch();

    const categories: Category[] = useSelector((state) => state.category);

    // console.log(categories);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(transactionFormSchema),
    });

    const onSubmit = (formData: Transaction) => {
        // console.log(formData);

        formData.id = shortUUID.generate();
        formData.date = new Date().toISOString();
        dispatch(addTransaction(formData));

        onCloseModal();
    };

    return (
        <div className="form-transaction-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldLayout>
                    <BasicFieldController
                        name="transactionType"
                        control={control}
                    >
                        {(field) => (
                            <Select
                                {...field}
                                className="select-container"
                                placeholder="Seleccionar tipo de transacción"
                                aria-errormessage={
                                    errors.transactionType?.message
                                }
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
                    <BasicFieldController name="amount" control={control}>
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
                    <BasicFieldController name="description" control={control}>
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
                    <BasicFieldController name="category" control={control}>
                        {(field) => (
                            <Select
                                {...field}
                                className="select-container"
                                id="transaction-category"
                                placeholder="Selecciona una categoría..."
                            >
                                {categories.map((category) => (
                                    <Option
                                        key={category.id}
                                        value={category.value}
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
                    <BasicFieldController name="notes" control={control}>
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
