import { ReactElement, ReactNode } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import "./BasicFieldController.css";

interface Props {
    name: string;
    control?: any;
    defaultValue?: string | number | boolean;
    children: (field: any) => ReactElement;
}

export default function BasicFieldController({
    name,
    control,
    defaultValue,
    children,
}: Props) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => children(field)}
        />
    );
}
