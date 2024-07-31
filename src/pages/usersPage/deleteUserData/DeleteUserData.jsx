import "./DeleteUserData.css";
import Button from "../../../generalComponents/buttons/Button";
// import SuccessModalBody from "../../../generalComponents/modalComponent/successModalBody/SuccessModalBody";
import deleteUserData from "../../../testApis/deleteUserData";
import { urls } from "../../../constants/urls/urls";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { editToken } from "../../../redux/slices/authorization/authSlice";
import { useTranslation } from "react-i18next";

const DeleteUserData = ({
    user, 
    setIsUserDataDeleted,
    isUserDataDeleted,
    onCloseHandler
}) => {
    const [ openCloseSuccessModal, setOpenCloseSuccessModal ] = useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onDeleteClickHandler = async () => {
        const response = await deleteUserData(urls.DELETE_USER_DATA_URL, user.id);

        if (response.message === "success") {
            setIsUserDataDeleted(!isUserDataDeleted);
            setOpenCloseSuccessModal(true);
            setTimeout(() => {
                onCloseHandler();
            }, 3000);
        } else if (response.message === "invalid token") {
            localStorage.clear();
            dispatch(editToken(""));
    
            <Navigate to="/login" />;
        }
    };

    return (
        <div className="delete-user-data-content">
            <p>{t("questions.doYouWantDelete")} <b>{user.username}</b> {t("userSection.userData")}</p>
            <div className="delete-user-data-buttons">
                <Button label="Ջնջել" 
                        backgroundColor="red"
                        marginRight="10px"
                        onClickHandler={() => onDeleteClickHandler()} />
                <Button label="Չեղարկել" 
                        backgroundColor="white"
                        color="red"
                        onClickHandler={() => onCloseHandler()} />
            </div>
            {/* {openCloseSuccessModal &&
                <SuccessModalBody />
            } */}
        </div>
    )
};

export default DeleteUserData;