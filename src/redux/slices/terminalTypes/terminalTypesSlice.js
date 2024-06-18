import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    terminalTypes: [],
};

export const terminalTypesSlice = createSlice({
    name: "terminalTypes",
    initialState,
    reducers: {
        saveTerminalTypes: (state, terminalTypes) => {
            state.terminalTypes = terminalTypes;
        },
    }
});

export const { saveTerminalTypes } = terminalTypesSlice.actions;
export default terminalTypesSlice.reducer;