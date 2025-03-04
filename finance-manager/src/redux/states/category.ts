import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../models/category.model";

const sliceName = "category";

const initialState: Category[] = [
    { id: "0", value: "salud", label: "Salud", backgroundColor: "#2b6397" },
    { id: "1", value: "ocio", label: "Ocio", backgroundColor: "#82ffa1" },
    { id: "2", value: "hogar", label: "Hogar", backgroundColor: "#ffbf65" },
    {
        id: "4",
        value: "transporte",
        label: "Transporte",
        backgroundColor: "#ff6565",
    },
    { id: "5", value: "otros", label: "Otros", backgroundColor: "#c4c4c4" },
];

// if (localStorage.getItem(sliceName)) {
//     initialState.push(...JSON.parse(localStorage.getItem(sliceName) as string));
// }

// if (!localStorage.getItem(sliceName)) {
//     localStorage.setItem(sliceName, JSON.stringify(initialState));
// }

export const categorySlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        addCategory: (state, action) => {
            localStorage.setItem(
                sliceName,
                JSON.stringify([...state, action.payload])
            );
            state.push(action.payload);
        },
        removeCategory: (state, action) => {
            return state.filter((category) => category.id !== action.payload);
        },
    },
});

export const { addCategory, removeCategory } = categorySlice.actions;

export default categorySlice.reducer;
