import "./ChangeUserData.css";
import Button from "../../../generalComponents/buttons/Button";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../generalComponents/inputFields/selectComponent/SelectComponent";
import CheckBoxLabels from "../../../generalComponents/inputFields/checkbox/CheckBoxComponent";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import SuccessModalBody from "../../../generalComponents/modalComponent/successModalBody/SuccessModalBody";
import changeUserData from "../../../api/changeUserData";
import { urls } from "../../../constants/urls/urls";
import { emailValidation } from "../../../utils/fieldsValidations/userDataFieldsValidation";
import { isChangedAnyData } from "../../../utils/helpers/isChangedAnyData";
import { logoutUser } from "../../../redux/slices/authorization/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const ChangeUserData = ({
    user,
    setIsUserDataChanged,
    isUserDataChanged,
    onCloseHandler
}) => {
    const banks = useSelector((state) => state.banks.banksAllData.payload);
    const roles = useSelector((state) => state.roles.roles.payload);
    const [ changedUserData, setChangedUserData ] = useState({
        id: user.id,
        username: user.username,
        bank: user.bank,
        email: user.email,
        role: user.role,
        is_active: user.is_active
    });
    const [ usernameEmptyError, setUsernameEmptyError ] = useState(false);
    const [ usernameLengthError, setUsernameLengthError ] = useState(false);
    const [ emailEmptyError, setEmailEmptyError ] = useState(false);
    const [ invalidEmailError, setInvalidEmailError ] = useState(false);
    const [ openCloseModal, setOpenCloseModal ] = useState(false);
    const [ openCloseSuccessModal, setOpenCloseSuccessModal ] = useState(false);

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const banksList = [];
    banks.map((bank) => banksList.push(bank.short_name));

     const checkFieldsValidation = ({ username, email }) => {
        let existsError = false;

        if (!username.length) {
            existsError = true;
            setUsernameEmptyError(true);
        } else {
            if (username.length < 3) {
                existsError = true;
                setUsernameLengthError(true);
            }
        }
        if (!email.length) {
            existsError = true;
            setEmailEmptyError(true);
        } else {
            if (!emailValidation(email)) {
                existsError = true;
                setInvalidEmailError(true);
            }
        }

        return existsError;
    };

    const resetPrevValidations = () => {
        setUsernameEmptyError(false);
        setUsernameLengthError(false);
        setEmailEmptyError(false);
        setInvalidEmailError(false);
    };

    const onClickSaveButton = async () => {
        resetPrevValidations();

        if (!checkFieldsValidation(changedUserData)) {
            if (!isChangedAnyData(user, changedUserData)) {                
                onCloseHandler();
            } else {
                const responseChangeUserData = await changeUserData(urls.PUT_USER_DATA_URL, changedUserData);

                if (responseChangeUserData.message === "success") {
                    setIsUserDataChanged(!isUserDataChanged);
                    setOpenCloseSuccessModal(true);
                    setTimeout(() => {
                        onCloseHandler();
                    }, 3000);                    
                } else if (responseChangeUserData.message === "invalid token") {
                    localStorage.clear();
                    dispatch(logoutUser());

                    <Navigate to="/login" />;
                } else {
                    throw Error("Connection error!");
                }
            }            
        }
    };

    return (
        <>
            <div className="change-user-data-area">
                <div className="change-user-data-content">
                    <TextInput label={t("userSection.username")}
                               defaultValue={user.username}
                               existsError={usernameEmptyError || usernameLengthError}
                               errorText={
                                   usernameEmptyError ? t("searchArea.emptyFieldError") :
                                   usernameLengthError ? t("userSection.usernameLengthError") : null
                               }
                               onChangeHandler={(evt) => setChangedUserData({
                                   ...changedUserData,
                                   username: evt.target.value
                               })} />
                    <SelectComponent label={t("banks.bank")}
                                     defaultValue={user.bank}
                                     chooseData={banksList}
                                     fields={changedUserData}
                                     setField={setChangedUserData}
                                     changeFieldName={"bank"}
                                     width={"223px"}
                                     marginTop={"10px"} />
                    <TextInput label={t("userSection.email")}
                               defaultValue={user.email}
                               marginTop={"10px"}
                               existsError={emailEmptyError || invalidEmailError}
                               errorText={
                                   emailEmptyError ? t("searchArea.emptyFieldError") :
                                   invalidEmailError ? t("userSection.invalidEmail") : null
                               }
                               onChangeHandler={(evt) => setChangedUserData({
                                   ...changedUserData,
                                   email: evt.target.value
                               })} />
                    <SelectComponent label={t("userSection.role")}
                                     defaultValue={user.role}
                                     chooseData={roles}
                                     fields={changedUserData}
                                     setField={setChangedUserData}
                                     changeFieldName={"role"}
                                     width={"223px"}
                                     marginTop={"10px"} />
                    <CheckBoxLabels label={t("banks.isActive")}
                                    defaultChecked={user.is_active}
                                    onChangeHandler={(evt) => setChangedUserData({
                                        ...changedUserData,
                                        is_active: evt.target.value
                                    })} />
                </div>
                <div className="change-user-data-buttons">
                    <Button label={t("changeTerminalData.saveBtn")}
                            backgroundColor="green"
                            marginRight="10px"
                            onClickHandler={() => onClickSaveButton()} 
                    />
                    <Button label={t("addNewTerminal.cancelBtn")} 
                            backgroundColor="red"
                            onClickHandler={() => onCloseHandler()} 
                    />
                </div>
            </div>
            {openCloseSuccessModal &&
                <SuccessModalBody />
            }
            {openCloseModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseModal(false)}
                                isOpen={true}
                                title="Connection failed!"
                                body={<ErrorModalBody />}
                                bgcolor="red" />
            }
        </>
    );
};

export default ChangeUserData;