import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActivePage } from "../redux/states/sidebar";
import { useLocation } from "react-router";

const useSetActivePage = () => {
    const location = useLocation().pathname;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActivePage(location));
    }, [location, dispatch]);
};

export default useSetActivePage;
