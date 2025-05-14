import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import MainButton from "../../components/Button/MainButton/MainButton";
import useSetActivePage from "../../hooks/useSetActivePage";
import Modal from "../../Modal";
import { Group } from "../../models/group.model";
import AddGroup from "./components/AddGroup/AddGroup";
import GroupCard from "./components/GroupCard/GroupCard";
import "./Groups.css";
import { getGroups } from "./services/groups.service";

export default function Groups() {
    useSetActivePage();

    const currentProfileId = useSelector((state) => state.profile.fm_u);

    const {
        isLoading,
        isError,
        data: groups = [],
    } = useQuery<Group[]>({
        queryKey: ["relatedGroups"],
        queryFn: () => getGroupsLocal(currentProfileId),
    });

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
        console.log(result);
        return result;
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
                {isLoading && (
                    <div className="groups-list-loading-container">
                        <PropagateLoader
                            color="var(--loading-color)"
                            size={10}
                        />
                    </div>
                )}
                {isError && (
                    <p className="groups-list-error-container">
                        Ha ocurrido un error al cargar los grupos. Recarga la
                        página.
                    </p>
                )}
                {groups.length > 0 &&
                    !isLoading &&
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
