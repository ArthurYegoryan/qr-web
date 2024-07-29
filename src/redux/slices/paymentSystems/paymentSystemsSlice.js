import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paymentSystems: [],
};

export const paymentSystemsSlice = createSlice({
    name: "paymentSystems",
    initialState,
    reducers: {
        savePaymentSystems: (state, paymentSystems) => {
            state.paymentSystems = paymentSystems;
        },
    }
});

export const { savePaymentSystems } = paymentSystemsSlice.actions;
export default paymentSystemsSlice.reducer;