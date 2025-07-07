import React, { ReactNode } from "react";
import "./Modal.css";
import { createPortal } from "react-dom";
import { motion } from "motion/react";

interface Props {
    children: ReactNode;
    title?: string;
    dataTestId: string;
    onClose: () => void;
    onOverlayClose?: boolean;
    className?: string;
    overlayClassName?: string;
}

export default function Modal({
    className = "",
    children,
    title,
    dataTestId = "",
    onClose,
    onOverlayClose = false,
    overlayClassName,
}: Props) {
    /**
     * Handles the case when the user closes the modal by clicking on the overlay (When onOverlayClose prop is true)
     * @param e event
     * @returns Closes the modal if the event target is the overlay
     */
    const handleOnOverlayClose = (e: React.MouseEvent<HTMLDivElement>) =>
        e.target === e.currentTarget ? onClose() : {};

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            exit={{ opacity: 0 }}
            className={`modal-overlay ${overlayClassName}`}
            onClick={onOverlayClose ? handleOnOverlayClose : () => {}}
        >
            <motion.div
                initial={{
                    scale: 0,
                    opacity: 0,
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                }}
                transition={{ duration: 0.25 }}
                exit={{
                    scale: 0,

                    // opacity: 0,
                }}
                className={`modal-container ${className}`}
                data-testid={dataTestId}
            >
                {/* <button onClick={onClose} className="modal-close-btn">
                    X
                </button> */}
                {title && <h2 className="modal-title">{title}</h2>}
                {children}
            </motion.div>
        </motion.div>,
        document.getElementById("modal-root") as HTMLElement
    );
}
