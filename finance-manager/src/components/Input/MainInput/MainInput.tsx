import React, { ForwardedRef, ReactNode } from "react";
import "./MainInput.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    beforeChildren?: ReactNode;
    afterChildren?: ReactNode;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    name?: string;
    type: string;
    placeholder?: string;
    error?: boolean;
    errorMessage?: string;
}

const MainInput = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            startIcon = null,
            endIcon = null,
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
            <div className="">
                {beforeChildren}
                <div
                    className="main-input-container"
                    style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {startIcon}
                    <input
                        {...props}
                        ref={ref} // Ahora el ref se pasa correctamente
                        className={`main-input  ${
                            error && "main-input-error"
                        } `}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                    ></input>
                    {endIcon && (
                        <div className="main-input-end-icon">{endIcon}</div>
                    )}
                </div>

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
