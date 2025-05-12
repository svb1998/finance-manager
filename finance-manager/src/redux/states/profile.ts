import { createSlice } from "@reduxjs/toolkit";
import { ProfileData } from "../../models/platform/profileData.model";

const sliceName = "profile";

let initialState: ProfileData = {
    fm_u: "",
    fm_n: "",
};

if (localStorage.getItem("fm_p")) {
    initialState = {
        fm_u: JSON.parse(localStorage.getItem("fm_p") as string).fm_u,
        fm_n: JSON.parse(localStorage.getItem("fm_p") as string).fm_n,
    };
}

export const profileSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setProfile: (state, action) => {
            localStorage.setItem("fm_p", JSON.stringify(action.payload));
            state = action.payload;
        },
    },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
