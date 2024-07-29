import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authorization/authSlice";
import menuReducer from "./slices/menu/menuSlice";
// import banksSlice from "./slices/banks/banksSlice";
// import rolesSlice from "./slices/roles/rolesSlice";
import posModelsSlice from "./slices/posModels/posModelsSlice";
import paymentSystemsSlice from "./slices/paymentSystems/paymentSystemsSlice";
import citiesSlice from "./slices/cities/citiesSlice";
import mccsSlice from "./slices/mccs/mccsSlice";
import statusCodesSlice from "./slices/statusCodes/statusCodesSlice";
import transactionTypesSlice from "./slices/transactionTypes/transactionTypesSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
        // banks: banksSlice,
        // roles: rolesSlice,
        posModels: posModelsSlice,
        paymentSystems: paymentSystemsSlice,
        cities: citiesSlice,
        mccs: mccsSlice,
        statusCodes: statusCodesSlice,
        transactionTypes: transactionTypesSlice,
    },
});