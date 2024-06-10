import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    banks: {}
};

export const banksSlice = createSlice({
    name: "banks",
    initialState,
    reducers: {
        saveBanks: (state, banks) => {
            state.banks = banks
        }
    }
});

export const { saveBanks } = banksSlice.actions;
export default banksSlice.reducer;