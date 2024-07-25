import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mccs: [],
};

export const mccsSlice = createSlice({
    name: "mccs",
    initialState,
    reducers: {
        saveMccs: (state, mccs) => {
            state.mccs = mccs;
        },
    }
});

export const { saveMccs } = mccsSlice.actions;
export default mccsSlice.reducer;