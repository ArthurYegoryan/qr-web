import "./ChangePasswordBody.css";
import TextInput from "../../../../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import { useTranslation } from 'react-i18next';

const ChangePasswordBody = () => {
    const { t } = useTranslation();

    return (
        <div className="change-pass-body">
            <TextInput label={t("userSection.oldPassword")}
                       width="35ch"
                       isPassword={true} />
            <TextInput label={t("userSection.newPassword")}
                       marginTop="10px"
                       width="35ch" 
                       isPassword={true} />
            <TextInput label={t("userSection.confirmNewPassword")}
                       marginTop="10px"
                       width="35ch"
                       isPassword={true} />
        </div>
    );
};

export default ChangePasswordBody;