import Modal from "../../../Modal";
import "./Dialog.css";
import { ReactNode, useState } from "react";

import MainButton from "../../Button/MainButton/MainButton";
import OutlineButton from "../../Button/OutlineButton/OutlineButton";

interface Props {
    onOverlayClose?: boolean;
    children?: ReactNode;
    title: string;
    subtitle: string;
    message: ReactNode | string;
    mainAction: () => void | Promise<void> | null;
    cancelButton?: string | ReactNode;
    actionButton?: string | ReactNode;
    onClose: () => void;
    width?: string;
    height?: string;
    maxWidth?: string;
    minWidth?: string;
    maxHeight?: string;
    minHeight?: string;
}

export default function Dialog({
    onOverlayClose,
    title,
    subtitle,
    message,
    onClose,
    mainAction,
    children,
    cancelButton = "Cancelar",
    actionButton = "Aceptar",
    width = "80%",
    minWidth = "270px",
    maxWidth = "550px",
    height = "auto",
    minHeight = "auto",
    maxHeight = "auto",
}: Props) {
    return (
        <Modal
            width={width}
            minWidth={minWidth}
            maxWidth={maxWidth}
            height={height}
            minHeight={minHeight}
            maxHeight={maxHeight}
            onClose={onClose}
            onOverlayClose={onOverlayClose}
        >
            <div className="dialog-container">
                <div className="dialog-content">
                    <h2 className="dialog-title">{title}</h2>
                    <p className="dialog-subtitle">{subtitle}</p>
                    <p className="dialog-message"> {message}</p>
                    {children}
                </div>
                <div className="dialog-buttons-section">
                    <OutlineButton type="button" onClick={onClose}>
                        {cancelButton}
                    </OutlineButton>
                    <MainButton type="button" onClick={mainAction}>
                        {actionButton}
                    </MainButton>
                </div>
            </div>
        </Modal>
    );
}
