import "./DeleteBankData.css";
import Button from "../../../generalComponents/buttons/Button";
import SuccessModalBody from "../../../generalComponents/modalComponent/successModalBody/SuccessModalBody";
import deleteBankData from "../../../api/deleteBankData";
import { urls } from "../../../constants/urls/urls";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { editToken } from "../../../redux/slices/authorization/authSlice";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const DeleteBankData = ({ 
    bank, 
    setIsBankDataDeleted,
    isBankDataDeleted,
    onCloseHandler 
}) => {
    const [ openCloseSuccessModal, setOpenCloseSuccessModal ] = useState(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const onDeleteClickHandler = async () => {
        const response = await deleteBankData(urls.DELETE_BANK_DATA_URL, bank.id);

        if (response.message === "success") {
            setIsBankDataDeleted(!isBankDataDeleted);
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
        <div className="delete-bank-data-content">
            <p>{t("questions.doYouWantDelete")} <b>{bank.short_name}</b> {t("banks.bankDatas")}</p>
            <div className="delete-bank-data-buttons">
                <Button label={t("operations.delete")} 
                        backgroundColor="red"
                        marginRight="10px"
                        onClickHandler={() => onDeleteClickHandler()} />
                <Button label={t("operations.cancel")}
                        backgroundColor="white"
                        color="red"
                        onClickHandler={() => onCloseHandler()} />
            </div>
            {openCloseSuccessModal &&
                <SuccessModalBody />
            }
        </div>
    )
};

export default DeleteBankData;