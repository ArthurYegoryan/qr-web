import "./DeleteTerminalData.css";
import Button from "../../../generalComponents/buttons/Button";
import deleteTerminalData from "../../../testApis/deleteTerminalData";
import { urls } from "../../../constants/urls/urls";
import { paths } from "../../../constants/paths/paths";
import { colors } from "../../../assets/styles/colors";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { editToken } from "../../../redux/slices/authorization/authSlice";
import { useTranslation } from "react-i18next";

const DeleteTerminalData = ({ 
    terminal, 
    setIsTermDataDeleted,
    isTermDataDeleted,
    onCloseHandler 
}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onDeleteClickHandler = async () => {
        const response = await deleteTerminalData(urls.DELETE_TERMINAL_DATA_URL, terminal.serial);

        if (response.status === 201) {
            setIsTermDataDeleted(!isTermDataDeleted);
            onCloseHandler();
        } else if (response.status === 401) {
            localStorage.clear();
            dispatch(editToken(""));
    
            <Navigate to={paths.LOGIN} />;
        }
    };

    console.log("Currnet terminal: ", JSON.stringify(terminal, null, 2));

    return (
        <div className="delete-term-data-content">
            <p>{t("questions.doYouWantToInactivate")} <b>{terminal.serial_number}</b> {t("questionsPostfixes.terminalsDataWithSearial")}</p>
            <div className="delete-term-data-buttons">
                <Button label={t("operations.inactivate")} 
                        backgroundColor={colors.cancelBgColor}
                        hoverColor={colors.cancelHoverColor}
                        marginRight="10px"
                        onClickHandler={() => onDeleteClickHandler()} />
                <Button label={t("operations.cancel")}
                        backgroundColor={colors.whiteColor}
                        hoverColor={colors.whiteHoverColor}
                        color={colors.cancelBgColor}
                        onClickHandler={() => onCloseHandler()} />
            </div>            
        </div>
    )
};

export default DeleteTerminalData;