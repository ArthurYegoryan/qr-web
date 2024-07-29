import "./WillBeSoonModalBody.css";
import ButtonComponent from "../../buttons/Button";
import { colors } from "../../../assets/styles/colors";
import { useTranslation } from "react-i18next";

const WillBeSoonModalBody = ({
    onCloseHandler
}) => {
    const { t } = useTranslation();

    return (
        <div className="will-be-soon-modal-body">
            <h2>{t("generalMessages.willBeAvailableSoon")}</h2>
            <div className="will-be-soon-modal-body-ok-btn">
                <ButtonComponent label={t("operations.close")}
                                backgroundColor={colors.successBgColor}
                                hoverColor={colors.successHoverColor}
                                onClickHandler={onCloseHandler} />
            </div>            
        </div>
    );
};

export default WillBeSoonModalBody;