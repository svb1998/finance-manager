import "./Settings.css";
import { useLocation } from "react-router";
import useSetActivePage from "../../hooks/useSetActivePage";

export default function Settings() {
    const location = useLocation();
    useSetActivePage(location.pathname);

    return <div className="settings-container">Soon...</div>;
}
