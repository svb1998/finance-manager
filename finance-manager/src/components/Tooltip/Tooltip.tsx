import React from "react";
import "./Tooltip.css";

export interface TooltipProps {
    children: React.ReactNode;
    content: string;
}

export default function Tooltip({ children, content }: TooltipProps) {
    return (
        // <div className="tooltip-wrapper">
        <div className="tooltip-container">
            {children}
            <span className="tooltip-content">{content}</span>
        </div>
        // </div>
    );
}
