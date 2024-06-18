import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authorization/authSlice";
import menuReducer from "./slices/menu/menuSlice";
import banksSlice from "./slices/banks/banksSlice";
import rolesSlice from "./slices/roles/rolesSlice";
import terminalTypesSlice from "./slices/terminalTypes/terminalTypesSlice";
import paymentSystemsSlice from "./slices/paymentSystems/paymentSystemsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
        banks: banksSlice,
        roles: rolesSlice,
        terminalTypes: terminalTypesSlice,
        paymentSystems: paymentSystemsSlice,
    },
});