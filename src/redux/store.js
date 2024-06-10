import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authorization/authSlice";
import menuReducer from "./slices/menu/menuSlice";
import banksSlice from "./slices/banks/banksSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
        banks: banksSlice,
    },
});