import { Navigate, Outlet } from "react-router";
import { removeLocalStorage } from "../utilities/localStorage.utility";

export default function ProtectedRoutes() {
    const token = localStorage.getItem("fm_tk");

    if (token) {
        return <Outlet />;
    } else {
        removeLocalStorage("fm_tk");
        return <Navigate to="/login" replace />;
    }
}
