import { applyMiddleware, combineReducers, createStore } from "redux";
import { authReducer, initialAuthState } from "./slices/authorization/auth";
import { menuReducer, initialMenuState } from "./slices/menu/menu";
import { thunk } from "redux-thunk";

const store = createStore(combineReducers({
    auth: authReducer,
    menu: menuReducer
}), {
    auth: initialAuthState,
    menu: initialMenuState
}, applyMiddleware(thunk));

export default store;