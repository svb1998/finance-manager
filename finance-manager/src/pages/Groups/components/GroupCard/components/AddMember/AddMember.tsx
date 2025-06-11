import React from "react";
import "./AddMember.css";
import { Search, UserRoundMinus } from "lucide-react";
import AddMemberItem from "./components/AddMemberItem";
import MainButton from "../../../../../../components/Button/MainButton/MainButton";
import OutlineButton from "../../../../../../components/Button/OutlineButton/OutlineButton";

export default function AddMember() {
    const members = [
        {
            name: "Andres",
            lastname: "Sanchez",
        },
        {
            name: "Javier",
            lastname: "Sanchez",
        },
        {
            name: "Steven",
            lastname: "Valencia",
        },
    ];

    return (
        <div className="add-member-container">
            <div className="add-member-searcher">
                <input
                    className="add-member-searcher-input"
                    type="text"
                    placeholder="Buscar"
                />
                {/* <button className="main-button add-member-searcher-button">
                    <Search size={24} />
                </button> */}
            </div>
            {members && members.length > 0 && (
                <>
                    <ul className="add-member-list">
                        {members &&
                            members.map((member) => (
                                <AddMemberItem
                                    memberName={`${member.name} ${member.lastname}`}
                                />
                            ))}
                    </ul>
                    <div className="add-member-buttons-section">
                        <OutlineButton>Cancelar</OutlineButton>
                        <MainButton>Guardar</MainButton>
                    </div>
                </>
            )}
        </div>
    );
}
