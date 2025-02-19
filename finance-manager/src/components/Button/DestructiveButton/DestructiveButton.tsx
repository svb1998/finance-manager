import { MouseEventHandler, ReactNode } from "react";
import "../ButtonStyles.css";

interface Props {
    children: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function DestructiveButton({ children, onClick }: Props) {
    return (
        <button className="button destructive-button" onClick={onClick}>
            {children}
        </button>
    );
}
