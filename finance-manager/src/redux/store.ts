import { configureStore } from "@reduxjs/toolkit";
import { transactionSlice } from "./states/transaction";
import { categorySlice } from "./states/category";

const store = configureStore({
    reducer: {
        transaction: transactionSlice.reducer,
        category: categorySlice.reducer,
    },
});

export default store;
