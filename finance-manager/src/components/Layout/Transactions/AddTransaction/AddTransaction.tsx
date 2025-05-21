import { Select } from "antd";
import { useForm } from "react-hook-form";
import MainButton from "../../../Button/MainButton/MainButton";
import OutlineButton from "../../../Button/OutlineButton/OutlineButton";
import MainInput from "../../../Input/MainInput/MainInput";
import FieldLayout from "../../FieldLayout/FieldLayout";
import "../Transaction.css";

import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import shortUUID from "short-uuid";
import { Transaction } from "../../../../models";
import { Category } from "../../../../models/category.model";

import BasicFieldController from "../../../FieldControllers/BasicFieldController/BasicFieldController";
import { transactionAddFormSchema } from "../schemas/TransactionForm.schema";
import { addTransaction } from "./services/AddTransaction.service";

const { Option } = Select;

interface Props {
    onCloseModal: () => void;
}

export default function AddTransaction({ onCloseModal }: Props) {
    const dispatch = useDispatch();

    const categories: Category[] = useSelector((state) => state.category);

    const activeProfileId = useSelector((state) => state.profile.fm_u);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(transactionAddFormSchema),
    });

    const onSubmit = async (formData: Transaction) => {
        formData.senderId = activeProfileId;
        const result = await addTransaction(formData);

        onCloseModal();
    };

    return (
        <div className="form-transaction-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldLayout>
                    <BasicFieldController name="type" control={control}>
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
