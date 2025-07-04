import { AnimatePresence } from "motion/react";
import { useState } from "react";
import Modal from "../../../../Modal";
import MainButton from "../../../../components/Button/MainButton/MainButton";
import AddTransaction from "../../../../components/Layout/Transactions/AddTransaction/AddTransaction";
import "./DashboardActions.css";

export default function DashboardActions() {
    //Modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    /**
     * Function that opens the modal
     */
    const openModal = () => {
        setIsModalOpen(true);
    };

    /**
     * Function that closes the modal
     */
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="dashboard-actions-container">
            <MainButton onClick={openModal}>Añadir transacción</MainButton>
            <AnimatePresence>
                {isModalOpen && (
                    <Modal
                        onClose={closeModal}
                        onOverlayClose
                        title="Añadir transacción"
                        dataTestId="add-transaction-modal"
                    >
                        <AddTransaction onCloseModal={closeModal} />
                    </Modal>
                )}
            </AnimatePresence>
        </div>
    );
}
