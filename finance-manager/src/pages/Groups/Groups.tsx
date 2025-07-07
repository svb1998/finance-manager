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
import { getGroups } from "./services/Groups.service";

export interface RelatedGroupWithDetails extends Group {
    role: string;
    memberCount: number;
}

export default function Groups() {
    useSetActivePage();

    const currentProfileId = useSelector((state) => state.profile.fm_u);

    const {
        isLoading,
        isError,
        data: groups = [],
    } = useQuery<RelatedGroupWithDetails[]>({
        queryKey: ["relatedGroups"],
        queryFn: () => getGroupsLocal(currentProfileId),
    });

    //Modals
    const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] =
        useState<boolean>(false);

    /**
     * Function that opens the modal
     */
    const openCreateGroupModal = () => {
        setIsCreateGroupModalOpen(true);
    };

    /**
     * Function that closes the modal
     */
    const closeCreateGroupModal = () => {
        setIsCreateGroupModalOpen(false);
    };

    const getGroupsLocal = async (currentProfileId: string) => {
        // console.log("CURRENT PROFILE ID", currentProfileId);
        const result = await getGroups(currentProfileId);
        //console.log(result);
        return result;
    };

    return (
        <div className="groups-container">
            <div className="groups-header">
                <MainButton onClick={openCreateGroupModal}>
                    Crear grupo
                </MainButton>
                <AnimatePresence>
                    {isCreateGroupModalOpen && (
                        <Modal
                            onClose={closeCreateGroupModal}
                            onOverlayClose
                            title="Nuevo grupo"
                            dataTestId="create-group-modal"
                        >
                            <AddGroup onCloseModal={closeCreateGroupModal} />
                        </Modal>
                    )}
                </AnimatePresence>
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
                    groups.map((group: RelatedGroupWithDetails) => (
                        <GroupCard
                            key={group.groupId}
                            name={group.name}
                            description={group.description}
                            groupId={group.groupId}
                            memberCount={group.memberCount}
                            role={group.role}
                        />
                    ))}
            </div>
        </div>
    );
}
