import { configureStore } from "@reduxjs/toolkit";
import { transactionSlice } from "./states/transaction";

const store = configureStore({
    reducer: {
        transaction: transactionSlice.reducer,
    },
});

export default store;
