import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../models/category.model";

const sliceName = "category";

const initialState: Category[] = [
    { id: "0", value: "salud", label: "Salud", backgroundColor: "#ADFF2F" },
    { id: "1", value: "ocio", label: "Ocio", backgroundColor: "#92D927" },
    { id: "2", value: "hogar", label: "Hogar", backgroundColor: "#78B320" },
    {
        id: "3",
        value: "transporte",
        label: "Transporte",
        backgroundColor: "#5E8C19",
    },
    { id: "4", value: "otros", label: "Otros", backgroundColor: "#456612" },
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
