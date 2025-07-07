/* eslint-disable @typescript-eslint/no-unused-vars */
import MainButton from "../../../../components/Button/MainButton/MainButton";
import OutlineButton from "../../../../components/Button/OutlineButton/OutlineButton";
import MainInput from "../../../../components/Input/MainInput/MainInput";
import "./addMember.css";

import { useEffect } from "react";
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

    const { mutate: findMembers, isPending } = useMutation({
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
            <p className="add-member-description">
                Añade uno o más miembros al grupo.
            </p>
            <section>
                <MainInput
                    onChange={(e) => setInputValue(e.target.value)}
                    type="text"
                    name="name"
                    placeholder="Ej: Alejandro, Steven, etc."
                    required
                    // error={errors.amount !== undefined}
                    // errorMessage={errors.amount?.message}
                />
            </section>
            <div className="add-member-divider"></div>
            <section className="add-member-members-container">
                <h2 className="add-member-members-title">Miembros añadidos</h2>
                <ul className="add-member-members-list">
                    {members.length > 0 ? (
                        members.map((member) => (
                            <MemberItem
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
