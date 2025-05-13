import { useDispatch, useSelector } from "react-redux";
import MainButton from "../../components/Button/MainButton/MainButton";
import useSetActivePage from "../../hooks/useSetActivePage";
import GroupCard from "./components/GroupCard/GroupCard";
import "./Groups.css";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import Modal from "../../Modal";
import AddGroup from "./components/AddGroup/AddGroup";
import { getGroups } from "./services/groups.service";
import { Group } from "../../models/group.model";

export default function Groups() {
    useSetActivePage();

    const currentProfileId = useSelector((state) => state.profile.fm_u);

    const [groups, setGroups] = useState<Group[]>([]);

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

    const getGroupsLocal = async (currentProfileId: string) => {
        const result = await getGroups(currentProfileId);
        setGroups(result);
    };

    useEffect(() => {
        getGroupsLocal(currentProfileId);
    }, []);

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
                {groups.length > 0 &&
                    groups.map((group: Group) => (
                        <GroupCard
                            key={group.groupId}
                            name={group.name}
                            description={group.description}
                            groupId={group.groupId}
                        />
                    ))}
            </div>
        </div>
    );
}
