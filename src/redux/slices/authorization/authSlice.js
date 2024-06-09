import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: localStorage.getItem("user_id") ?? "",
    username: localStorage.getItem("username") ?? "",
    role: localStorage.getItem("role") ?? "",
    isLoggedIn: localStorage.getItem("isLoggedIn") ?? false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser: (state) => {
            state.isLoggedIn = true;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
        },
        editID: (state, id) => {
            state.id = id;
        },
        editUsername: (state, username) => {
            state.username = username;
        },
        editRole: (state, role) => {
            state.role = role;
        },
    }
});

export const { loginUser, logoutUser, editID, editUsername, editRole } = authSlice.actions;
export default authSlice.reducer;