import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const LoginRouteWrapper = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    if (isLoggedIn) {
        return <Navigate to="/terminals" />
    }

    return <Outlet />;
};

export default LoginRouteWrapper;