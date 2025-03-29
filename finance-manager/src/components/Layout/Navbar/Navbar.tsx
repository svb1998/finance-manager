import { Menu } from "lucide-react";
import "./Navbar.css";
import profileIcon from "../../../assets/profile-icon2.svg"
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../../redux/states";

interface Props {
    className?: string;
    id?: string;
}

export default function Navbar(props: Props) {

    const dispatch = useDispatch()
   
    return (
        <nav
            className={`${props.className} navbar-container`}
            id={`${props.id}`}
        >
            <div className="sidebar-controller" onClick={() => dispatch(toggleSidebar())}>
                <Menu />
            </div>

            <div>
                <img src={profileIcon} alt="" width={36} height={36} />
            </div>
       
           
        </nav>
    );
}
