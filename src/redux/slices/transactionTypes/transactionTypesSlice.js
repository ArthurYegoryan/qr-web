import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactionTypes: [],
};

export const transactionTypesSlice = createSlice({
    name: "transactionTypes",
    initialState,
    reducers: {
        saveTransactionTypes: (state, transactionTypes) => {
            state.transactionTypes = transactionTypes;
        },
    }
});

export const { saveTransactionTypes } = transactionTypesSlice.actions;
export default transactionTypesSlice.reducer;