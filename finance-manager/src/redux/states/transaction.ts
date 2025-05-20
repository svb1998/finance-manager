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
        setTransactions: (state, action) => {
            localStorage.setItem(sliceName, JSON.stringify(action.payload));
            return action.payload;
        },
        addTransaction: (state, action) => {
            localStorage.setItem(
                sliceName,
                JSON.stringify([...state, action.payload])
            );
            state.push(action.payload);
        },
        removeTransaction: (state, action) => {
            const resultTransactions = state.filter(
                (transaction) => transaction.id !== action.payload
            );

            localStorage.setItem(sliceName, JSON.stringify(resultTransactions));

            return resultTransactions;
        },
        editTransaction: (state, action) => {
            const resultTransactions = state.map((transaction) => {
                if (transaction.id === action.payload.id) {
                    return action.payload;
                }
                return transaction;
            });

            localStorage.setItem(sliceName, JSON.stringify(resultTransactions));

            return resultTransactions;
        },
    },
});

export const {
    setTransactions,
    addTransaction,
    removeTransaction,
    editTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;
