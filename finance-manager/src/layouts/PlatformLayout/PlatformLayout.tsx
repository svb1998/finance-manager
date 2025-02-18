import { ReactNode } from "react";
import "./PlatformLayout.css";
import Navbar from "../../components/Layout/Navbar/Navbar";
import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Footer from "../../components/Layout/Footer/Footer";

interface Props {
    children: ReactNode;
}

export default function PLatformLayout(children: Props) {
    return (
        <div className="platform-layout">
            <Navbar id="navbar-layout" />
            <Sidebar id="sidebar-layout" />
            <main id="content-layout">{children.children}</main>
            {/* <Footer id="footer-layout" /> */}
        </div>
    );
}
