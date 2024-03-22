import getTerminalsByPage from "../../../api/getTerminalsByPage"
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

export const loadTerminals = () => {
    return (dispatch, getState) => {
        return getTerminalsByPage(urls.GET_TERMINALS_BY_PAGE_URL, {page: 1}).then((response) => {
            return response.data;
        }).then((terminalsData) => {
            if (terminalsData.message === "success") {
                dispatch(editTerminals(terminalsData.terminals));
            } else {
                throw new Error();
            }
        });
    };
};