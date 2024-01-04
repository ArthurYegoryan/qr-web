import "./LogoutContainer.css";
import Button from "../../../../../../generalComponents/buttons/Button";
import { Navigate } from "react-router-dom";

const LogoutContainer = () => {
    const onClickHandler = () => {
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