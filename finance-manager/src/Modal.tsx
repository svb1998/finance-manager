import React, { ReactNode } from "react";
import "./Modal.css";
import { createPortal } from "react-dom";
interface Props {
    children: ReactNode;
    title?: string;
    onClose: () => void;
    onOverlayClose: boolean;
}

export default function Modal({
    children,
    title,
    onClose,
    onOverlayClose = false,
}: Props) {
    /**
     * Handles the case when the user closes the modal by clicking on the overlay (When onOverlayClose prop is true)
     * @param e event
     * @returns Closes the modal if the event target is the overlay
     */
    const handleOnOverlayClose = (e: React.MouseEvent<HTMLDivElement>) =>
        e.target === e.currentTarget ? onClose() : {};

    return createPortal(
        <div
            className="modal-overlay"
            onClick={onOverlayClose ? handleOnOverlayClose : () => {}}
        >
            <div className="modal-container">
                {/* <button onClick={onClose} className="modal-close-btn">
                    X
                </button> */}
                <h2 className="modal-title">{title}</h2>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
    );
}
