import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    terminals: [],
};

export const terminalsSlice = createSlice({
    name: "terminals",
    initialState,
    reducers: {
        editTerminals: (state, terminals) => {
            state.terminals = terminals;
        },
    }
});

export const { editTerminals } = terminalsSlice.actions;
export default terminalsSlice.reducer;