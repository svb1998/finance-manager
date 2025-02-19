import React, { ReactNode } from "react";
import "./MainInput.css";

interface Props {
    beforeChildren?: ReactNode;
    afterChildren?: ReactNode;
    name: string;
    type: string;
    placeholder?: string;
}

export default function MainInput({
    beforeChildren = null,
    afterChildren = null,
    name,
    type = "text",
    placeholder = "",
}: Props) {
    return (
        <div className="main-input-container">
            {beforeChildren}
            <input
                className="main-input"
                type={type}
                name={name}
                placeholder={placeholder}
            />
            {afterChildren}
        </div>
    );
}
