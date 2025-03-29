import { createSlice } from "@reduxjs/toolkit";

const sliceName = "sidebar";

const initialState = {
    isOpen: localStorage.getItem(sliceName)
        ? JSON.parse(localStorage.getItem(sliceName) as string).isOpen
        : false,
    activePage: localStorage.getItem(sliceName)
        ? JSON.parse(localStorage.getItem(sliceName) as string).activePage
        : "",
};

export const sidebarSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            // console.log("toggleSidebar", state.isOpen);
            state.isOpen = !state.isOpen;
            localStorage.setItem(sliceName, JSON.stringify(state));
        },
        setActivePage: (state, action) => {
            // console.log("setActivePage", action.payload);
            state.activePage = action.payload;
            localStorage.setItem(sliceName, JSON.stringify(state));
        },
    },
});

export const { toggleSidebar, setActivePage } = sidebarSlice.actions;

export default sidebarSlice.reducer;
