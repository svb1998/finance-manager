import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "../../models";

const sliceName = "transaction";

const initialState: Transaction[] = [];

export const transactionSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            state.push(action.payload);
        },
        removeTransaction: (state, action) => {
            console.log(state);
            console.log(action.payload);
            return state.filter(
                (transaction) => transaction.id !== action.payload
            );
        },
    },
});

export const { addTransaction, removeTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
