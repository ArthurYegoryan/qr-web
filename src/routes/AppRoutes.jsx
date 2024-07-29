import { Navigate, Route, Routes } from "react-router-dom";
import { paths } from "../constants/paths/paths";
import LoginRouteWrapper from "./LoginRouteWrapper";
import ProtectedRoute from "./ProtectedRoute";
import LoginContainer from "../pages/loginPage/LoginContainer";
import TerminalsPage from "../pages/terminalsPage/TerminalsPage";
import TransactionsPage from "../pages/transactionsPage/TransactionsPage";
import UsersPage from "../pages/usersPage/UsersPage";
import BanksPage from "../pages/banksPage/BanksPage";
import ErrorPage from "../pages/errorPage/ErrorPage";

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
                <Route path={paths.USERS} element={<UsersPage />} />
                <Route path={paths.PAYMENT_SYSTEMS} element={<BanksPage />} />
                <Route path={paths.ANY} element={<ErrorPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;