import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    banks: {},
    banksAllData: []
};

export const banksSlice = createSlice({
    name: "banks",
    initialState,
    reducers: {
        saveBanks: (state, banks) => {
            state.banks = banks;
        },
        saveBanksAllData: (state, banksAllData) => {
            state.banksAllData = banksAllData;
        }
    }
});

export const { saveBanks, saveBanksAllData } = banksSlice.actions;
export default banksSlice.reducer;