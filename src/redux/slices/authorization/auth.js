import getUserInfo from "../../../api/getUserInfo";
import { urls } from "../../../constants/urls/urls";

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case "edit-username":
            return {
                ...state,
                username: action.payload.username,
            };
        case "edit-token":
            return {
                ...state,
                token: action.payload.token
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
    username: "",
    isLoggedIn: false,
    token: ""
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

export const editUsername = (newUsername) => {
    return {
        type: "edit-username",
        payload: {
            username: newUsername
        }
    };
};

export const selectToken = (state) => {
    return state.auth.token;
};

export const editToken = (newToken) => {
    return {
        type: "edit-token",
        payload: {
            token: newToken
        }
    };
};

export const loadUserInfo = (username, password) => {
    return (dispatch, getState) => {
        return getUserInfo(urls.GET_USER_INFO_URL, username, password).then((response) => {
            return response.data;
        }).then((userData) => {
            dispatch(editUsername(userData.username));
            dispatch(editToken(userData.token));
        });
    };
};