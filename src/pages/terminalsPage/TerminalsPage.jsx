import { useDispatch, useSelector } from "react-redux";
import { loadTerminals } from "../../redux/slices/terminals/terminals";
import { Navigate } from "react-router-dom";
import { editToken, logoutUser } from "../../redux/slices/authorization/auth";

const TerminalsPage = () => {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    try {
        loadTerminals(token);
    } catch(err) {
        localStorage.clear();
        dispatch(editToken(""));
        dispatch(logoutUser());

        <Navigate to="/login" />;
    }

    return (
        <div>
            <h1>
                Terminals Page
            </h1>
        </div>
    );
};

export default TerminalsPage;