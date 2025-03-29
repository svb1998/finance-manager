import { ReactNode } from "react";
import "./LittleCard.css";

interface Props {
    id?: string;
    className?: string;
    children?: ReactNode;
    title?: string;
}

export default function LittleCard(props: Props) {
    return (
        <div
            id={props.id}
            className={`${props.className} little-card-container`}
        >
            {props.title && (
                <div className="little-card-title">{props.title}</div>
            )}
            {props.children}
        </div>
    );
}
