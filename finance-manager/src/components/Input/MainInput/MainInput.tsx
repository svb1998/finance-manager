import React, { ForwardedRef, ReactNode } from "react";
import "./MainInput.css";

interface Props {
    beforeChildren?: ReactNode;
    afterChildren?: ReactNode;
    name?: string;
    type: string;
    placeholder?: string;
}

const MainInput = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            beforeChildren = null,
            afterChildren = null,
            name,
            type = "text",
            placeholder = "",
            ...props
        }: Props,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <div className="main-input-container">
                {beforeChildren}
                <input
                    {...props}
                    ref={ref} // Ahora el ref se pasa correctamente
                    className="main-input"
                    type={type}
                    name={name}
                    placeholder={placeholder}
                />
                {afterChildren}
            </div>
        );
    }
);

export default MainInput;
