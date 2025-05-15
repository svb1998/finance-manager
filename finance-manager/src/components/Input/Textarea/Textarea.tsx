import React, { ForwardedRef, ReactNode } from "react";
import "./Textarea.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name?: string;
    placeholder?: string;
    error?: boolean;
    errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            name,
            placeholder = "",
            error = false,
            errorMessage = "",
            ...props
        }: Props,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <div className="">
                <div
                    className="textarea-container"
                    style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <textarea
                        {...props}
                        ref={ref}
                        className={`textarea  ${error && "textarea-error"} `}
                        name={name}
                        placeholder={placeholder}
                    ></textarea>
                </div>

                {error && (
                    <div className="textarea-error-message">{errorMessage}</div>
                )}
            </div>
        );
    }
);

export default Textarea;
