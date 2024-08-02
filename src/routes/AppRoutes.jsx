import { Navigate, Route, Routes } from "react-router-dom";
import { paths } from "../constants/paths/paths";
import LoginRouteWrapper from "./LoginRouteWrapper";
import ProtectedRoute from "./ProtectedRoute";
import LoginContainer from "../pages/loginPage/LoginContainer";
import TerminalsPage from "../pages/terminalsPage/TerminalsPage";
import TransactionsPage from "../pages/transactionsPage/TransactionsPage";
import MccCodesPage from "../pages/mccCodesPage/MccCodesPage";
import CitiesPage from "../pages/citiesPage/CitiesPage";
// import UsersPage from "../pages/usersPage/UsersPage";
// import BanksPage from "../pages/banksPage/BanksPage";
import Error404Page from "../pages/errorPage/Error404Page";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={paths.LOGIN} element={<LoginRouteWrapper />}>
                <Route index element={<LoginContainer />} />
            </Route>
            <Route path={paths.MAIN} element={<ProtectedRoute />}>
                <Route index element={<Navigate to={paths.TERMINALS} />} />
                <Route path={paths.TERMINALS} element={<TerminalsPage />} />
                <Route path={paths.TRANSACTIONS} element={<TransactionsPage />} />
                <Route path={paths.MCC_CODES} element={<MccCodesPage />} />
                <Route path={paths.CITIES} element={<CitiesPage />} />
                {/* <Route path={paths.USERS} element={<UsersPage />} />
                <Route path={paths.PAYMENT_SYSTEMS} element={<BanksPage />} /> */}
                <Route path={paths.ANY} element={<Error404Page />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;