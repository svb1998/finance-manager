import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.css";
import { useEffect, useState } from "react";
import { ArrowLeftRight, Bolt, LayoutDashboard, Users } from "lucide-react";
import { setActivePage } from "../../../redux/states";
import Item from "./components/Item/Item";
import { useNavigate } from "react-router";

interface Props {
    className?: string;
    id?: string;
}

export default function Sidebar({ className = "", id }: Props) {
    const listIndex = {
        dashboard: "/dashboard",
        groups: "/groups",
        categories: "/categories",
        settings: "/settings",
    };

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const sidebarStatus = useSelector((store) => store.sidebar);

    const activePage = sidebarStatus.activePage;

    const [sidebarClassname, setsidebarClassname] = useState<string>(
        sidebarStatus.isOpen ? "sidebar-expanded" : "sidebar-collapsed"
    );

    useEffect(() => {
        setsidebarClassname(
            sidebarStatus.isOpen ? "sidebar-expanded" : "sidebar-collapsed"
        );
    }, [sidebarStatus]);

    return (
        <aside
            className={`${className}  sidebar-container ${sidebarClassname}`}
            id={`${id}`}
        >
            <ul className="sidebar-list items-group">
                <Item
                    pageTitle="Dashboard"
                    isActive={activePage == listIndex.dashboard}
                    onClick={() => navigate(listIndex.dashboard)}
                    icon={LayoutDashboard}
                />
                <Item
                    pageTitle="Grupos"
                    isActive={activePage == listIndex.groups}
                    onClick={() => navigate(listIndex.groups)}
                    icon={Users}
                />
            </ul>
            <ul className="sidebar-list ">
                <Item
                    pageTitle="Configuración"
                    isActive={activePage == listIndex.settings}
                    onClick={() => navigate(listIndex.settings)}
                    icon={Bolt}
                />
            </ul>
        </aside>
    );
}
