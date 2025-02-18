import { MouseEventHandler, ReactNode } from "react";
import "./MainButton.css";

interface Props {
    children: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function MainButton({ children, onClick }: Props) {
    return (
        <button className="main-button" onClick={onClick}>
            {children}
        </button>
    );
}
