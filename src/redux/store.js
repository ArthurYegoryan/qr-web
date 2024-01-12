import { applyMiddleware, combineReducers, createStore } from "redux";
import { authReducer, initialAuthState } from "./slices/authorization/auth";
import { menuReducer, initialMenuState } from "./slices/menu/menu";
import { terminalsReducer, initialTerminalsState } from "./slices/terminals/terminals";
import { thunk } from "redux-thunk";

const store = createStore(combineReducers({
    auth: authReducer,
    menu: menuReducer,
    terminals: terminalsReducer,
}), {
    auth: initialAuthState,
    menu: initialMenuState,
    terminals: initialTerminalsState,
}, applyMiddleware(thunk));

export default store;