import { ReactNode } from "react";
import "./FieldLayout.css";

interface Props {
    children: ReactNode;
}

export default function FieldLayout({ children }: Props) {
    return <div className="default-field-layout-container">{children}</div>;
}
