import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import MainPage from "../pages/mainPage/MainPage";
import { paths } from "../constants/paths/paths";

const ProtectedRoute = () => {
    const token = useSelector((state) => state.auth.token.payload) ?? localStorage.getItem("token");

    if (!token) {
        return <Navigate to={paths.LOGIN} />
    }
    
    return (
        <MainPage />
    );
};

export default ProtectedRoute;