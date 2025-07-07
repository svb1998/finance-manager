import MainButton from "../../../../components/Button/MainButton/MainButton";
import OutlineButton from "../../../../components/Button/OutlineButton/OutlineButton";
import MainInput from "../../../../components/Input/MainInput/MainInput";
import "./addMember.css";
import MemberItem from "./components/MemberItem/MemberItem";

interface Props {
    onCloseModal: () => void;
}

export default function AddMember({ onCloseModal }: Props) {
    return (
        <div className="add-member-container">
            <p className="add-member-description">
                Añade uno o más miembros al grupo.
            </p>
            <section>
                <MainInput
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
                    <div className="add-member-members-list-description">
                        Aqui verás los miembros que has añadido al grupo.
                    </div>
                    {/* <MemberItem name="Alejandro" key="1" />
                    <MemberItem name="Steven" key="2" />
                    <MemberItem name="María" key="3" />
                    <MemberItem name="Andrea" key="4" />
                    <MemberItem name="Carlos" key="5" />
                    <MemberItem name="Lucía" key="6" /> */}
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
