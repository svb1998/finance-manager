import { Bolt, LayoutDashboard, LogOut, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setActivePage, toggleSidebar } from "../../../redux/states";
import { removeLocalStorage } from "../../../utilities/localStorage.utility";
import Dialog from "../Dialog/Dialog";
import Item from "./components/Item/Item";
import "./Sidebar.css";
import { motion } from "motion/react";
import useLogout from "../../../hooks/useLogout";

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
    const logout = useLogout();
    const dispatch = useDispatch();

    const sidebarStatus = useSelector((store) => store.sidebar);

    const activePage = sidebarStatus.activePage;

    const [sidebarClassname, setsidebarClassname] = useState<string>(
        sidebarStatus.isOpen ? "sidebar-expanded" : "sidebar-collapsed"
    );

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        setsidebarClassname(
            sidebarStatus.isOpen ? "sidebar-expanded" : "sidebar-collapsed"
        );
    }, [sidebarStatus]);

    const navigateFromSidebar = (route: string) => {
        const currentWidth = window.innerWidth;

        navigate(route);
        if (currentWidth <= 768) {
            dispatch(toggleSidebar());
        }
    };

    return (
        <>
            <aside
                className={`${className}  sidebar-container ${sidebarClassname}`}
                id={`${id}`}
            >
                {sidebarStatus.isOpen && (
                    <motion.div
                        transition={{
                            delay: 0.15,
                        }}
                        animate={{
                            opacity: [0, 1],
                        }}
                        className="sidebar-overlay"
                        onClick={() => dispatch(toggleSidebar())}
                    ></motion.div>
                )}
                <ul className="sidebar-list items-group">
                    <Item
                        pageTitle="Dashboard"
                        isActive={activePage == listIndex.dashboard}
                        onClick={() => navigateFromSidebar(listIndex.dashboard)}
                        icon={LayoutDashboard}
                    />
                    <Item
                        pageTitle="Grupos"
                        isActive={activePage == listIndex.groups}
                        onClick={() => navigateFromSidebar(listIndex.groups)}
                        icon={Users}
                    />
                </ul>
                <ul className="sidebar-list ">
                    <Item
                        pageTitle="Configuración"
                        isActive={activePage == listIndex.settings}
                        onClick={() => navigateFromSidebar(listIndex.settings)}
                        icon={Bolt}
                    />
                    <Item
                        pageTitle="Salir"
                        isActive={false}
                        onClick={() => {
                            setIsDialogOpen(true);
                        }}
                        icon={LogOut}
                    />
                </ul>
                {isDialogOpen && (
                    <Dialog
                        onOverlayClose
                        onClose={() => {
                            setIsDialogOpen(false);
                        }}
                        title="Cerrar sesión"
                        subtitle="¿Estás seguro que quieres cerrar sesión?"
                        message=""
                        cancelButton="Cancelar"
                        actionButton="Salir"
                        mainAction={() => logout()}
                    />
                )}
            </aside>
        </>
    );
}
