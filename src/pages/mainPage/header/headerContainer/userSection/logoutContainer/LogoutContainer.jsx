import "./LogoutContainer.css";
import Button from "../../../../../../generalComponents/buttons/Button";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../../../redux/slices/authorization/authSlice";
import { useTranslation } from 'react-i18next';

const LogoutContainer = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onClickHandler = () => {
        dispatch(logoutUser());
        localStorage.clear();
        <Navigate to="/login" />
    };

    return (
        <div className="logout">
            <img src={process.env.PUBLIC_URL + "img/logout.svg"} alt="logout" />
            <Button label={t("userSection.logout")} onClickHandler={onClickHandler} />
        </div>
    );
};

export default LogoutContainer;