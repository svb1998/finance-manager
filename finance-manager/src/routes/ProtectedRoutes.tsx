import { Navigate, Outlet } from "react-router";
import {
    getLocalStorage,
    removeLocalStorage,
} from "../utilities/localStorage.utility";

export default function ProtectedRoutes() {
    const token = getLocalStorage("fm_tk");

    if (token) {
        return <Outlet />;
    } else {
        removeLocalStorage("fm_tk");
        return <Navigate to="/login" replace />;
    }
}
