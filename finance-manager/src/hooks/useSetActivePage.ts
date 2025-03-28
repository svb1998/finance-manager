import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActivePage } from "../redux/states/sidebar";

const useSetActivePage = (currentPage: string) => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActivePage(currentPage));
    },[currentPage, dispatch])


}

export default useSetActivePage;