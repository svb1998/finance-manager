import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setProfile } from "../redux/states/profile";
import { removeLocalStorage } from "../utilities/localStorage.utility";
import { setActivePage } from "../redux/states";
import { useNavigate } from "react-router";

/**
 * Custom hook that handles the logout process.
 *
 */
const useLogout = () => {
    const dispatch = useDispatch();
    const clientQuery = useQueryClient();
    const navigate = useNavigate();

    const logout = () => {
        //Clear redux states
        dispatch(setProfile(null));
        dispatch(setActivePage("/"));

        //Clear tanstack queries
        clientQuery.clear();

        //Clear localStorage
        removeLocalStorage("fm_tk");
        removeLocalStorage("fm_p");

        //Navigate to login page
        navigate("/login");
    };

    return logout;
};

export default useLogout;
