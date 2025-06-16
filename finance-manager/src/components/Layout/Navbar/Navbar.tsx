import { Menu } from "lucide-react";
import "./Navbar.css";
import profileIcon from "../../../assets/logo.svg";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../../redux/states";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";

interface Props {
    className?: string;
    id?: string;
}

export default function Navbar(props: Props) {
    const dispatch = useDispatch();

    return (
        <nav
            className={`${props.className} navbar-container`}
            id={`${props.id}`}
        >
            <div
                className="sidebar-controller"
                onClick={() => dispatch(toggleSidebar())}
            >
                <Menu />
            </div>

            <div className="navbar-section">
                <ThemeToggle />
                <img src={profileIcon} alt="" width={36} height={36} />
            </div>
        </nav>
    );
}
