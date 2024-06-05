export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case "edit-id":
            return {
                ...state,
                id: action.payload.id,
            };
        case "edit-username":
            return {
                ...state,
                username: action.payload.username,
            };
        case "edit-role":
            return {
                ...state,
                role: action.payload.role,
            };
        case "login-user":
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn
            };
        case "logout-user":
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn
            };
        default:
            return state;
    }
};

export const initialAuthState = {
    id: localStorage.getItem("user_id") ?? "",
    username: localStorage.getItem("username") ?? "",
    role: localStorage.getItem("role") ?? "",
    isLoggedIn: localStorage.getItem("isLoggedIn") ?? false,
};

export const loginUser = () => {
    return {
        type: "login-user",
        payload: {
            isLoggedIn: true
        }
    };
};

export const logoutUser = () => {
    return {
        type: "logout-user",
        payload: {
            isLoggedIn: false
        }
    };
};

export const selectUsername = (state) => {
    return state.auth.username;
};

export const editID = (id) => {
    return {
        type: "edit-id",
        payload: {
            id
        }
    };
};

export const editUsername = (newUsername) => {
    return {
        type: "edit-username",
        payload: {
            username: newUsername
        }
    };
};

export const editRole = (newRole) => {
    return {
        type: "edit-role",
        payload: {
            role: newRole
        }
    };
};