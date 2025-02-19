import { useDispatch } from "react-redux";
import "./Navbar.css";

import MainButton from "../../Button/MainButton/MainButton";
import { useState } from "react";
import Modal from "../../../Modal";
import TransactionAdd from "./components/TransactionAdd/TransactionAdd";

interface Props {
    className?: string;
    id?: string;
}

export default function Navbar(props: Props) {
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
        <nav
            className={`${props.className} navbar-container`}
            id={`${props.id}`}
        >
            <MainButton onClick={openModal}>Añadir transacción</MainButton>
            {isModalOpen && (
                <Modal
                    onClose={closeModal}
                    onOverlayClose
                    title="Añadir transacción"
                >
                    <TransactionAdd />
                </Modal>
            )}
        </nav>
    );
}
