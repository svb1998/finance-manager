import React, { ForwardedRef, ReactNode } from "react";
import "./MainInput.css";

interface Props {
    beforeChildren?: ReactNode;
    afterChildren?: ReactNode;
    name?: string;
    type: string;
    placeholder?: string;
    error?: boolean;
    errorMessage?: string;
}

const MainInput = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            beforeChildren = null,
            afterChildren = null,
            name,
            type = "text",
            placeholder = "",
            error = false,
            errorMessage = "",
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
                    className={`main-input  ${error && "main-input-error"} `}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                />
                {error && (
                    <div className="main-input-error-message">
                        {errorMessage}
                    </div>
                )}
                {afterChildren}
            </div>
        );
    }
);

export default MainInput;
