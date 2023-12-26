import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    token: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser(state) {
            state.isLoggedIn = true;
        },
        logoutUser(state) {
            state.isLoggedIn = false;
        }
    },
});

const { actions, reducer } = authSlice;
export const { loginUser, logoutUser } = actions;
export default reducer;