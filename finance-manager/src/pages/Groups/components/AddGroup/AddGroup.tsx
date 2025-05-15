import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import MainButton from "../../../../components/Button/MainButton/MainButton";
import OutlineButton from "../../../../components/Button/OutlineButton/OutlineButton";
import BasicFieldController from "../../../../components/FieldControllers/BasicFieldController/BasicFieldController";
import MainInput from "../../../../components/Input/MainInput/MainInput";
import Textarea from "../../../../components/Input/Textarea/Textarea";
import FieldLayout from "../../../../components/Layout/FieldLayout/FieldLayout";
import { Group } from "../../../../models/group.model";
import { addGroup } from "../../services/Groups.service";
import { groupFromSchema } from "../schemas/GroupForm.schema";
import "./AddGroup.css";

interface Props {
    onCloseModal: () => void;
}

export default function AddGroup({ onCloseModal }: Props) {
    const queryClient = useQueryClient();

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
        mutate(formData);
    };

    const addGroupLocal = (formData: Group) => {
        const profileUUID = profile?.fm_u;

        const result = addGroup(formData, profileUUID);

        return result;
    };

    const { mutate, isPending } = useMutation({
        mutationFn: addGroupLocal,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["relatedGroups"] });
            onCloseModal();
        },
        onError: (error) => {
            console.log(error);
        },
    });

    return (
        <div className="form-group-container">
            {isPending ? (
                <div className="form-group-container__loading">
                    <PulseLoader size={10} color="var(--loading-color)" />
                </div>
            ) : (
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
                        <BasicFieldController
                            name="description"
                            control={control}
                        >
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
            )}
        </div>
    );
}
