import { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../../../Modal";
import AddTransaction from "../../../../components/Layout/Transactions/AddTransaction/AddTransaction";
import MainButton from "../../../../components/Button/MainButton/MainButton";
import "./DashboardActions.css";
import { AnimatePresence } from "motion/react";

export default function DashboardActions() {
    //Redux dispatch
    const dispatch = useDispatch();

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
