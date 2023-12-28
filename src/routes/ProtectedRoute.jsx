import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import MainPage from "../pages/mainPage/MainPage";

const ProtectedRoute = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);    

    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }
    
    return (
        <MainPage />
    );
};

export default ProtectedRoute;