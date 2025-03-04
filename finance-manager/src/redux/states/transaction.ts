import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "../../models";

const sliceName = "transaction";

const initialState: Transaction[] = [];

if (localStorage.getItem(sliceName)) {
    initialState.push(
        ...(JSON.parse(
            localStorage.getItem(sliceName) as string
        ) as Transaction[])
    );
}

export const transactionSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            localStorage.setItem(
                sliceName,
                JSON.stringify([...state, action.payload])
            );
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
