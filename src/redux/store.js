import { applyMiddleware, combineReducers, createStore } from "redux";
import { authReducer, initialAuthState } from "./slices/authorization/auth";
import { thunk } from "redux-thunk";

const store = createStore(combineReducers({
    auth: authReducer
}), {
    auth: initialAuthState
}, applyMiddleware(thunk));

export default store;