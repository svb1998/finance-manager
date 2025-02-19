import React from "react";
import "./TransactionAdd.css";
import MainInput from "../../../../Input/MainInput/MainInput";
import { Select } from "antd";
import FieldLayout from "../../../FieldLayout/FieldLayout";
import MainButton from "../../../../Button/MainButton/MainButton";
import DestructiveButton from "../../../../Button/DestructiveButton/DestructiveButton";

const { Option } = Select;

export default function TransactionAdd() {
    interface Category {
        id: number;

        value: string;
        label: string;
        backgrounColor: string;
    }

    const categories = [
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
    ];

    return (
        <div className="add-transaction-container">
            <FieldLayout>
                <MainInput
                    name="type"
                    type="text"
                    placeholder="Tipo de transacción..."
                />
            </FieldLayout>
            <FieldLayout>
                <MainInput
                    name="type"
                    type="number"
                    placeholder="Cantidad... (€)"
                />
            </FieldLayout>
            <FieldLayout>
                {" "}
                <MainInput
                    name="type"
                    type="text"
                    placeholder="Descripción..."
                />
            </FieldLayout>
            <FieldLayout>
                {" "}
                <Select
                    className="select-container"
                    id="transaction-category"
                    placeholder="Selecciona una categoría..."
                >
                    {categories.map((category) => (
                        <Option value={category.value}>
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
            </FieldLayout>
            <FieldLayout>
                <MainInput name="type" type="text" placeholder="Notas.." />
            </FieldLayout>

            <div className="add-transaction-buttons-container">
                <DestructiveButton onClick={() => {}}>
                    Cancelar
                </DestructiveButton>
                <MainButton onClick={() => {}}>Guardar</MainButton>
            </div>
        </div>
    );
}
