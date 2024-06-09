import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authorization/authSlice";
import menuReducer from "./slices/menu/menuSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
    },
});