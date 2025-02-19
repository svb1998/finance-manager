import { MouseEventHandler, ReactNode } from "react";
import "../ButtonStyles.css";

interface Props {
    children: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function MainButton({ children, onClick }: Props) {
    return (
        <button className="button main-button" onClick={onClick}>
            {children}
        </button>
    );
}
