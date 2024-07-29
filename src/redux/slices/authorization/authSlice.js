import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: localStorage.getItem("user_id") ?? "",
    username: localStorage.getItem("username") ?? "",
    role: localStorage.getItem("role") ?? "",
    bank: localStorage.getItem("bank") ?? "",
    token: localStorage.getItem("token") ?? ""
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        editID: (state, id) => {
            state.id = id;
        },
        editUsername: (state, username) => {
            state.username = username;
        },
        editRole: (state, role) => {
            state.role = role;
        },
        editBank: (state, bank) => {
            state.bank = bank;
        },
        editToken: (state, token) => {
            state.token = token;
        }
    }
});

export const { editID, editUsername, editRole, editBank, editToken } = authSlice.actions;
export default authSlice.reducer;