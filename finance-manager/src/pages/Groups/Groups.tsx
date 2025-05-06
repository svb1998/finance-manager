import MainButton from "../../components/Button/MainButton/MainButton";
import useSetActivePage from "../../hooks/useSetActivePage";
import GroupCard from "./components/GroupCard/GroupCard";
import "./Groups.css";

export default function Groups() {
    useSetActivePage();
    return (
        <div className="groups-container">
            <div className="groups-header">
                <MainButton>Crear grupo</MainButton>
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
