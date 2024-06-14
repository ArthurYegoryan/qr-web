import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roles: [],
};

export const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        saveRoles: (state, roles) => {
            state.roles = roles;
        }
    }
});

export const { saveRoles } = rolesSlice.actions;
export default rolesSlice.reducer;