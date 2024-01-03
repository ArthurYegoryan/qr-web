export const menuReducer = (state = {}, action) => {
    switch(action.type) {
        case "edit-menu-status-false":
            return {
                ...state,
                isMenuOpen: action.payload.isMenuOpen
            }
        case "edit-menu-status-true":
            return {
                ...state,
                isMenuOpen: action.payload.isMenuOpen
            }
        default:
            return state;
    }
};

export const initialMenuState = {
    isMenuOpen: true
};

export const editMenuStatusFalse = () => {
    return {
        type: "edit-menu-status-false",
        payload: {
            isMenuOpen: false
        }
    };
};

export const editMenuStatusTrue = () => {
    return {
        type: "edit-menu-status-true",
        payload: {
            isMenuOpen: true
        }
    };
};