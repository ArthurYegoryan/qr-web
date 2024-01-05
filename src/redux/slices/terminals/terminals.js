import getAllTerminals from "../../../api/getAllTerminals"
import { urls } from "../../../constants/urls/urls"

export const terminalsReducer = (state = {}, action) => {
    switch (action.type) {
        case "edit-terminals":
            return {
                ...state,
                terminals: action.payload.terminals
            };
        default:
            return state;
    };
};

export const initialTerminalsState = {
    terminals: [],
};

export const editTerminals = (terminals) => {
    return {
        type: "edit-terminals",
        payload: {
            terminals: terminals,
        }
    };
};

export const loadTerminals = (token) => {
    return (dispatch, getState) => {
        return getAllTerminals(urls.GET_ALL_TERMINALS_URL, token)
            .then((response) => {
                return response.data;
            })
            .then((terminalsData) => {
                if (terminalsData.message === "success") {
                    dispatch(editTerminals(terminalsData.terminals));
                } else {
                    throw new Error();
                }
            });
    };
};