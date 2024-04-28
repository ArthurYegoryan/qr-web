import "./ChangePasswordContainer.css";
import Button from "../../../../../../generalComponents/buttons/Button";
import { useTranslation } from 'react-i18next';

const ChangePasswordContainer = () => {
    const { t } = useTranslation();

    return (
        <div className="change-password">
            <Button label={t("userSection.changePassword")} marginRight="15px" />
        </div>
    );
};

export default ChangePasswordContainer;