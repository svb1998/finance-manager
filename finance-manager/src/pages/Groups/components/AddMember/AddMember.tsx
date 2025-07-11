/* eslint-disable @typescript-eslint/no-unused-vars */
import MainButton from "../../../../components/Button/MainButton/MainButton";
import OutlineButton from "../../../../components/Button/OutlineButton/OutlineButton";
import MainInput from "../../../../components/Input/MainInput/MainInput";

import { useEffect, useRef } from "react";
import "./AddMember.css";

import { useMutation } from "@tanstack/react-query";
// import { findMembersByQuery } from "./services/members.service";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { findMembersByQuery } from "./services/members.service";
import MemberItem from "./components/MemberItem/MemberItem";

interface Props {
    onCloseModal: () => void;
}

export default function AddMember({ onCloseModal }: Props) {
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

    const [membersResults, setMembersResults] = useState([]);

    const { mutate: findMembers, isPending } = useMutation({
        mutationKey: ["findMembers"],
        mutationFn: (query: string) =>
            handleFindMembersByQuery(
                query,
                members.map((m) => m.profileId)
            ),
    });

    const addMember = (member) => {
        setMembers([...members, member]);
        setMembersResults([]);
    };

    const handleRemoveMember = (member) => {
        setMembers(members.filter((m) => m.profileId !== member.profileId));
    };

    const handleFindMembersByQuery = async (
        query: string,
        excludedMemberIds: string[] = []
    ) => {
        console.log("Ids de miembros excluidos", excludedMemberIds);
        const response = await findMembersByQuery(query, excludedMemberIds);
        setMembersResults(response);
        console.log("Respuesta", response);

        return response;
    };

    //When the input doesn't change for 500ms, it executes the function
    useEffect(() => {
        if (debouncedValue) {
            findMembers(debouncedValue);
        } else {
            setMembersResults([]);
        }
    }, [debouncedValue, findMembers]);

    const ulRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ulRef.current &&
                !ulRef.current.contains(event.target as Node)
            ) {
                setMembersResults([]); // Oculta la lista
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="add-member-container">
            <p className="add-member-description">
                Añade uno o más miembros al grupo.
            </p>
            <section className="add-member-members-searcher">
                <MainInput
                    onChange={(e) => setInputValue(e.target.value)}
                    type="text"
                    name="name"
                    placeholder="Ej: Alejandro, Steven, etc."
                    required
                    // error={errors.amount !== undefined}
                    // errorMessage={errors.amount?.message}
                />

                {membersResults.length > 0 && (
                    <ul ref={ulRef} className="add-member-members-results-list">
                        {membersResults.map((member) => (
                            <MemberItem
                                onClick={() => addMember(member)}
                                type="add"
                                key={member.profileId}
                                name={member.name}
                            />
                        ))}
                    </ul>
                )}
            </section>

            <div className="add-member-divider"></div>
            <section className="add-member-members-container">
                <h2 className="add-member-members-title">Miembros añadidos</h2>
                <ul className="add-member-members-list">
                    {members.length > 0 ? (
                        members.map((member) => (
                            <MemberItem
                                onClick={() => handleRemoveMember(member)}
                                type="delete"
                                name={member.name}
                                key={member.profileId}
                            />
                        ))
                    ) : (
                        <div className="add-member-members-list-description">
                            Aqui verás los miembros que has añadido al grupo.
                        </div>
                    )}
                </ul>
            </section>

            <footer className="add-member-footer">
                <OutlineButton onClick={onCloseModal}>Cancelar</OutlineButton>
                <MainButton type="submit" onClick={onCloseModal}>
                    Guardar cambios
                </MainButton>
            </footer>
        </div>
    );
}
