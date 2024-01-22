import "./LogoutContainer.css";
import Button from "../../../../../../generalComponents/buttons/Button";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../../../redux/slices/authorization/auth";

const LogoutContainer = () => {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(logoutUser());
        localStorage.clear();
        console.log(logoutUser);
        <Navigate to="/login" />
    };

    return (
        <div className="logout">
            <img src={process.env.PUBLIC_URL + "logout.svg"} alt="logout" />
            <Button label="Դուրս գալ" className="button-logout" onClickHandler={onClickHandler} />
        </div>
    );
};

export default LogoutContainer;