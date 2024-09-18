import "./DeleteTerminalData.css";
import Button from "../../../generalComponents/buttons/Button";
import SuccessAnimation from "../../../generalComponents/successAnimation/SuccessAnimation";
import Loader from "../../../generalComponents/loaders/Loader";
import { putDataApi } from "../../../apis/putDataApi";
import { refreshTokenMakeCall } from "../../../utils/helpers/refreshTokenMakeCall";
import { urls } from "../../../constants/urls/urls";
import { paths } from "../../../constants/paths/paths";
import { colors } from "../../../assets/styles/colors";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editToken } from "../../../redux/slices/authorization/authSlice";
import { useTranslation } from "react-i18next";

const DeleteTerminalData = ({ 
    terminal, 
    setIsTermDataDeleted,
    isTermDataDeleted,
    onCloseHandler 
}) => {
    const [ showLoading, setShowLoading ] = useState(false);
    const [ showSuccessAnimation, setShowSuccessAnimation ] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onDeleteClickHandler = async () => {
        setShowLoading(true);
        const response = await putDataApi(urls.CLOSE_TERMINAL_URL + `${terminal.id}`);
        setShowLoading(false);

        if (response.status === 200) {
            setIsTermDataDeleted(!isTermDataDeleted);
            setShowSuccessAnimation(true);
            setTimeout(() => {
                onCloseHandler();
            }, 2500);
        } else if (response.status === 401) {
            setShowLoading(true);
            const response = await refreshTokenMakeCall(
                setShowLoading, 
                [ putDataApi ], 
                [urls.CLOSE_TERMINAL_URL + `${terminal.id}`],
                true
            );
            setShowLoading(false);

            if (response.callsResponses.length) {
                dispatch(editToken(response.responseRefreshToken.data.access_token));
                localStorage.setItem("token", response.responseRefreshToken.data.access_token);

                if (response.callsResponses[0].status === 200) {
                    setIsTermDataDeleted(!isTermDataDeleted);
                    setShowSuccessAnimation(true);
                    setTimeout(() => {
                        onCloseHandler();
                    }, 2500);
                } else if (response.callsResponses[0].status === 401) {
                    localStorage.clear();
                    dispatch(editToken(""));
            
                    navigate(paths.LOGIN);
                }
            } else {
                localStorage.clear();
                dispatch(editToken(""));
        
                navigate(paths.LOGIN);
            }
        }
    };

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
            {showSuccessAnimation &&
                <SuccessAnimation />
            }
            {showLoading &&
                <Loader />
            }
        </div>
    )
};

export default DeleteTerminalData;