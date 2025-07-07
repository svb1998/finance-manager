import { Outlet } from "react-router";
import Navbar from "../../components/Layout/Navbar/Navbar";
import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import "./PlatformLayout.css";

export default function PlatformLayout() {
    return (
        <div className="platform-layout">
            <Navbar id="navbar-layout" />
            <Sidebar id="sidebar-layout" />
            <main id="content-layout">
                <Outlet />
            </main>
            {/* <Footer id="footer-layout" /> */}
        </div>
    );
}
