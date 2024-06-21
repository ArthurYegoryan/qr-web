import "./AddNewUser.css"
import Button from "../../../../generalComponents/buttons/Button";
import TextInput from "../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../../generalComponents/inputFields/selectComponent/SelectComponent";
import CheckBoxLabels from "../../../../generalComponents/inputFields/checkbox/CheckBoxComponent";
import ModalComponent from "../../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import SuccessModalBody from "../../../../generalComponents/modalComponent/successModalBody/SuccessModalBody";
import getAllBanks from "../../../../api/getAllBanks";
import getRoles from "../../../../api/getRoles";
import addNewUser from "../../../../api/addNewUser";
import { urls } from "../../../../constants/urls/urls";
import { emailValidation, passwordValidations } from "../../../../utils/fieldsValidations/userDataFieldsValidation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { editToken } from "../../../../redux/slices/authorization/authSlice";

const AddNewUser = ({
    setIsUserDataChanged, 
    isUserDataChanged,
    onCloseHandler
}) => {
    const [ newUserData, setNewUserData ] = useState({
        username: "",
        bank: "",
        email: "",
        password: "",
        role: "",
        is_active: true
    });
    const [ banks, setBanks ] = useState([]);
    const [ roles, setRoles ] = useState([]);
    const [ usernameEmptyError, setUsernameEmptyError ] = useState(false);
    const [ usernameLengthError, setUsernameLengthError ] = useState(false);
    const [ bankEmptyError, setBankEmptyError ] = useState(false);
    const [ emailEmptyError, setEmailEmptyError ] = useState(false);
    const [ invalidEmailError, setInvalidEmailError ] = useState(false);
    const [ roleEmptyError, setRoleEmptyError ] = useState(false);
    const [ passwordEmptyError, setPasswordEmptyError ] = useState(false);
    const [ invalidPasswordError, setInvalidPasswordError ] = useState(false);
    const [ openCloseSuccessModal, setOpenCloseSuccessModal ] = useState(false);
    const [ openCloseErrorModal, setOpenCloseErrorModal ] = useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchBanksRoles = async () => {
            try {
                const responseBanks = await getAllBanks(urls.GET_BANKS_URL);
                const responseRoles = await getRoles(urls.GET_ROLES_URL);

                if (responseBanks.message === "success" &&
                    responseRoles.message === "success") {
                    const banksShortNames = [];

                    responseBanks.banks.map((bank) => {
                        banksShortNames.push(bank.short_name);
                    })

                    setBanks(banksShortNames);
                    setRoles(responseRoles.roles)
                } else if (responseBanks.message === "invalid token" ||
                           responseRoles.message === "invalid token") {
                    localStorage.clear();
                    dispatch(editToken(""));
            
                    <Navigate to="/login" />;
                } else {
                    throw Error("Users data error!");
                }
            } catch(err) {
                setOpenCloseErrorModal(true);
            }
        }
        fetchBanksRoles();
    }, []);

    const checkFieldsValidation = ({ username, bank, email, role, password }) => {
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
        if (!bank.length) {
            existsError = true;
            setBankEmptyError(true);
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
        if (!role.length) {
            existsError = true;
            setRoleEmptyError(true);
        }
        if (!password.length) {
            existsError = true;
            setPasswordEmptyError(true);
        } else {
            if (!passwordValidations(password)) {
                existsError = true;
                setInvalidPasswordError(true);
            }
        }

        return existsError;
    };

    const resetPrevValidations = () => {
        setUsernameEmptyError(false);
        setUsernameLengthError(false);
        setBankEmptyError(false);
        setEmailEmptyError(false);
        setInvalidEmailError(false);
        setRoleEmptyError(false);
        setPasswordEmptyError(false);
        setInvalidPasswordError(false);
    };

    const onClickAddButton = async () => {
        resetPrevValidations();

        if (!checkFieldsValidation(newUserData)) {
            const responseAddNewUser = await addNewUser(urls.POST_NEW_USER_URL, newUserData);

            if (responseAddNewUser.message === "success") {
                setIsUserDataChanged(!isUserDataChanged);
                setOpenCloseSuccessModal(true);
                setTimeout(() => {
                    onCloseHandler();
                }, 3000);                
            } else if (responseAddNewUser.message === "invalid token") {
                localStorage.clear();
                dispatch(editToken(""));

                <Navigate to="/login" />;
            } else {
                throw Error("Connection error!");
            }
        }
    };

    return (
        <>
            <div className="add-user-data-area">
                <div className="add-user-data-content">
                    <TextInput label={t("userSection.username")}
                               existsError={usernameEmptyError || usernameLengthError}
                               errorText={
                                   usernameEmptyError ? t("searchArea.emptyFieldError") :
                                   usernameLengthError ? t("userSection.usernameLengthError") : null
                               }
                               onChangeHandler={(evt) => setNewUserData({
                                   ...newUserData,
                                   username: evt.target.value
                               })} />
                    <SelectComponent label={t("banks.bank")}
                                     chooseData={banks}
                                     fields={newUserData}
                                     setField={setNewUserData}
                                     changeFieldName={"bank"}
                                     width={"223px"}
                                     marginTop={"10px"}
                                     existsError={bankEmptyError}
                                     errorText={t("searchArea.emptyFieldError")} />
                    <TextInput label={t("userSection.email")}
                               marginTop={"10px"}
                               existsError={emailEmptyError || invalidEmailError}
                               errorText={
                                   emailEmptyError ? t("searchArea.emptyFieldError") :
                                   invalidEmailError ? t("userSection.invalidEmail") : null
                               }
                               onChangeHandler={(evt) => setNewUserData({
                                   ...newUserData,
                                   email: evt.target.value
                               })} />
                    <SelectComponent label={t("userSection.role")}
                                     chooseData={roles}
                                     fields={newUserData}
                                     setField={setNewUserData}
                                     changeFieldName={"role"}
                                     width={"223px"}
                                     marginTop={"10px"}
                                     existsError={roleEmptyError}
                                     errorText={t("searchArea.emptyFieldError")} />
                    <TextInput label={t("userSection.password")}
                               isPassword={true}
                               marginTop={"10px"}
                               existsError={passwordEmptyError || invalidPasswordError}
                               errorText={
                                   passwordEmptyError ? t("searchArea.emptyFieldError") :
                                   invalidPasswordError ? t("userSection.passwordCritery") : null
                               }
                               onChangeHandler={(evt) => setNewUserData({
                                   ...newUserData,
                                   password: evt.target.value
                               })} />
                    <CheckBoxLabels label={t("banks.isActive")}
                                    defaultChecked={true}
                                    onChangeHandler={(evt) => setNewUserData({
                                        ...newUserData,
                                        is_active: evt.target.value
                                    })} />
                </div>
                <div className="add-user-data-buttons">
                    <Button label={t("addNewTerminal.addBtn")} 
                            marginRight="10px"
                            backgroundColor="green"
                            onClickHandler={() => onClickAddButton()} 
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
            {openCloseErrorModal &&
                <ModalComponent onCloseHandler={setOpenCloseErrorModal}
                                isOpen={true}
                                title="Connection failed"
                                body={<ErrorModalBody />}
                                bgcolor="red" />
            }
        </>
    );
};

export default AddNewUser;