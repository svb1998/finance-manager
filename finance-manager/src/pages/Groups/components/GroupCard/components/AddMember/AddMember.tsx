import React, { useEffect } from "react";
import "./AddMember.css";
import { Search, UserRoundMinus } from "lucide-react";
import AddMemberItem from "./components/AddMemberItem";
import MainButton from "../../../../../../components/Button/MainButton/MainButton";
import OutlineButton from "../../../../../../components/Button/OutlineButton/OutlineButton";
import { useMutation } from "@tanstack/react-query";
import { findMembersByQuery } from "./services/members.service";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function AddMember() {
    //Input debounce
    const [inputValue, setInputValue] = useState("");
    const [debouncedValue] = useDebounce(inputValue, 500);

    const [members, setMembers] = useState([
        // {
        //     name: "Andres",
        //     lastname: "Sanchez",
        // },
        // {
        //     name: "Javier",
        //     lastname: "Sanchez",
        // },
        // {
        //     name: "Steven",
        //     lastname: "Valencia",
        // },
    ]);

    const {
        mutate: findMembers,
        isPending,
        isLoading,
    } = useMutation({
        mutationKey: ["findMembers"],
        mutationFn: (query: string) => handleFindMembersByQuery(query),
    });

    const handleFindMembersByQuery = async (query: string) => {
        const response = await findMembersByQuery(query);
        console.log("Respuesta", response);
        return response;
    };

    //When the input doesn't change for 500ms, it executes the function
    useEffect(() => {
        if (debouncedValue) {
            findMembers(debouncedValue);
        }
    }, [debouncedValue, findMembers]);

    return (
        <div className="add-member-container">
            <div className="add-member-searcher">
                <input
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                    className="add-member-searcher-input"
                    type="text"
                    placeholder="Buscar"
                />
                {/* <button className="main-button add-member-searcher-button">
                    <Search size={24} />
                </button> */}
                //TODO: FIX THIS
                <div className="add-member-results">WIP...</div>
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
