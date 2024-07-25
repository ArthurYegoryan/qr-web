import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posModels: [],
};

export const posModelsSlice = createSlice({
    name: "posModels",
    initialState,
    reducers: {
        savePosModels: (state, posModels) => {
            state.posModels = posModels;
        },
    }
});

export const { savePosModels } = posModelsSlice.actions;
export default posModelsSlice.reducer;