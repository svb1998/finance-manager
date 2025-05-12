import { configureStore } from "@reduxjs/toolkit";
import { transactionSlice } from "./states/transaction";
import { categorySlice } from "./states/category";
import { sidebarSlice } from "./states/sidebar";
import { profileSlice } from "./states/profile";

const store = configureStore({
    reducer: {
        transaction: transactionSlice.reducer,
        category: categorySlice.reducer,
        sidebar: sidebarSlice.reducer,
        profile: profileSlice.reducer,
    },
});

export default store;
