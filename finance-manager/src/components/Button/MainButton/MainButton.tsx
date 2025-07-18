import { MouseEventHandler, ReactNode } from "react";
import "../ButtonStyles.css";

interface Props {
    children: ReactNode;
    type?: "submit" | "reset" | "button" | undefined;
    dataTestId?: string;
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function MainButton({
    children,
    type = "button",
    dataTestId = "",
    onClick,
}: Props) {
    return (
        <button
            data-testid={dataTestId}
            className="button main-button"
            role="button"
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
