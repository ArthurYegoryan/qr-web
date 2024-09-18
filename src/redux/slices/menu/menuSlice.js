import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMenuOpen: false
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        editMenuStatusFalse: (state) => {
            state.isMenuOpen = false;
        },
        editMenuStatusTrue: (state) => {
            state.isMenuOpen = true;
        },
    }
});

export const { editMenuStatusFalse, editMenuStatusTrue } = menuSlice.actions;
export default menuSlice.reducer;