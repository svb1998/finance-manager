import { MouseEventHandler, ReactNode } from "react";
import "../ButtonStyles.css";

interface Props {
    children: ReactNode;
    type?: "submit" | "reset" | "button" | undefined;
    onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function OutlineButton({
    children,
    type = "button",
    onClick,
}: Props) {
    return (
        <button className="button outline-button" type={type} onClick={onClick}>
            {children}
        </button>
    );
}
