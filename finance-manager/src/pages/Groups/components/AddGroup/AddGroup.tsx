import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import BasicFieldController from "../../../../components/FieldControllers/BasicFieldController/BasicFieldController";
import FieldLayout from "../../../../components/Layout/FieldLayout/FieldLayout";
import { groupFromSchema } from "../schemas/GroupForm.schema";
import "./AddGroup.css";
import MainButton from "../../../../components/Button/MainButton/MainButton";
import OutlineButton from "../../../../components/Button/OutlineButton/OutlineButton";
import MainInput from "../../../../components/Input/MainInput/MainInput";
import Textarea from "../../../../components/Input/Textarea/Textarea";
import { Group } from "../../../../models/group.model";
import { addGroup } from "../../services/groups.service";
import { useSelector } from "react-redux";

interface Props {
    onCloseModal: () => void;
}

export default function AddGroup({ onCloseModal }: Props) {
    const profile = useSelector((state) => state.profile);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(groupFromSchema),
    });

    const onSubmit = (formData: Group) => {
        console.log(formData);

        // formData.id = shortUUID.generate();
        // formData.date = new Date().toISOString();
        // dispatch(addTransaction(formData));

        const profileUUID = profile?.fm_u;

        addGroup(formData, profileUUID);

        onCloseModal();
    };

    return (
        <div className="form-transaction-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldLayout>
                    <BasicFieldController name="name" control={control}>
                        {(field) => (
                            <MainInput
                                {...field}
                                type="text"
                                name="name"
                                placeholder="Nombre del grupo..."
                                required
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
                            <Textarea
                                {...field}
                                name="description"
                                placeholder="Descripción..."
                            />
                        )}
                    </BasicFieldController>
                </FieldLayout>

                <div className="form-group-buttons-container">
                    <OutlineButton type="button" onClick={onCloseModal}>
                        Cancelar
                    </OutlineButton>
                    <MainButton type="submit">Crear</MainButton>
                </div>
            </form>
        </div>
    );
}
