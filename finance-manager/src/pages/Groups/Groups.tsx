import { useDispatch } from "react-redux";
import MainButton from "../../components/Button/MainButton/MainButton";
import useSetActivePage from "../../hooks/useSetActivePage";
import GroupCard from "./components/GroupCard/GroupCard";
import "./Groups.css";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Modal from "../../Modal";
import AddGroup from "./components/AddGroup/AddGroup";

export default function Groups() {
    useSetActivePage();

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
        <div className="groups-container">
            <div className="groups-header">
                <MainButton onClick={openModal}>Crear grupo</MainButton>
                <AnimatePresence>
                    {isModalOpen && (
                        <Modal
                            onClose={closeModal}
                            onOverlayClose
                            title="Nuevo grupo"
                            dataTestId="create-group-modal"
                        >
                            <AddGroup onCloseModal={closeModal} />
                        </Modal>
                    )}
                </AnimatePresence>
                {/* <div>Buscador</div> */}
            </div>
            <div className="groups-list">
                <GroupCard />
                <GroupCard />
                <GroupCard />
                <GroupCard />
            </div>
        </div>
    );
}
