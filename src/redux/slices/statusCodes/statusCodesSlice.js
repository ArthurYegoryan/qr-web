import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    statusCodes: [],
};

export const statusCodesSlice = createSlice({
    name: "statusCodes",
    initialState,
    reducers: {
        saveStatusCodes: (state, statusCodes) => {
            state.statusCodes = statusCodes;
        },
    }
});

export const { saveStatusCodes } = statusCodesSlice.actions;
export default statusCodesSlice.reducer;