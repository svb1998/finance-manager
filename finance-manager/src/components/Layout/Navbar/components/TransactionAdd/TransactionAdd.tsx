import "./TransactionAdd.css";
import MainInput from "../../../../Input/MainInput/MainInput";
import { Select } from "antd";
import FieldLayout from "../../../FieldLayout/FieldLayout";
import MainButton from "../../../../Button/MainButton/MainButton";
import DestructiveButton from "../../../../Button/DestructiveButton/DestructiveButton";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import BasicFieldController from "../../../../FieldControllers/BasicFieldController/BasicFieldController";
import { transactionAddSchema } from "./schemas/TransactionAdd.schema";
import { useDispatch } from "react-redux";
import shortUUID from "short-uuid";
import { addTransaction } from "../../../../../redux/states/transaction";
import { Transaction } from "../../../../../models";

const { Option } = Select;

interface Props {
    onCloseModal: () => void;
}

export default function TransactionAdd({ onCloseModal }: Props) {
    const dispatch = useDispatch();

    const { control, handleSubmit } = useForm({
        mode: "onChange",
        // resolver: yupResolver(transactionAddSchema),
    });

    interface Category {
        id: number;
        value: string;
        label: string;
        backgroundColor: string;
    }

    const categories: Category[] = [
        {
            id: 0,
            value: "salud",
            label: "Salud",
            backgroundColor: "#772121",
        },
        {
            id: 1,
            value: "ocio",
            label: "Ocio",
            backgroundColor: "#125822",
        },
        {
            id: 2,
            value: "hogar",
            label: "Hogar",
            backgroundColor: "#122158",
        },
        {
            id: 3,
            value: "transporte",
            label: "Transporte",
            backgroundColor: "#378988",
        },
    ];

    const onSubmit = (formData: Transaction) => {
        console.log(formData);

        formData.id = shortUUID.generate();
        //Acabar de perfilar
        dispatch(addTransaction(formData));

        onCloseModal();
    };

    return (
        <div className="add-transaction-container">
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

                <div className="add-transaction-buttons-container">
                    <DestructiveButton type="button" onClick={onCloseModal}>
                        Cancelar
                    </DestructiveButton>
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
