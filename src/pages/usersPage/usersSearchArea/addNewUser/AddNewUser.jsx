import "./AddNewUser.css"
import Button from "../../../../generalComponents/buttons/Button";
import TextInput from "../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../../generalComponents/inputFields/selectComponent/SelectComponent";
import CheckBoxLabels from "../../../../generalComponents/inputFields/checkbox/CheckBoxComponent";
import ModalComponent from "../../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import SuccessModalBody from "../../../../generalComponents/modalComponent/successModalBody/SuccessModalBody";
import getRoles from "../../../../api/getRoles";
import addNewUser from "../../../../api/addNewUser";
import { urls } from "../../../../constants/urls/urls";
import { checkFieldsValidation } from "../../../../utils/fieldsValidations/checkAddUserDataFieldsValidation";
import { resetPrevValidations } from "../../../../utils/fieldsValidations/resetPrevValidations";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { editToken } from "../../../../redux/slices/authorization/authSlice";

const AddNewUser = ({
    setIsUserDataChanged, 
    isUserDataChanged,
    onCloseHandler
}) => {
    const role = useSelector((state) => state.auth.role.payload) ?? localStorage.getItem("role");
    const banks = useSelector((state) => state.banks.banks.payload);
    const userBank = useSelector((state) => state.auth.bank.payload) ?? localStorage.getItem("bank");
    const [ newUserData, setNewUserData ] = useState({
        username: "",
        bank: role === "bank" ? banks[userBank] : "",
        email: "",
        password: "",
        role: role === "bank" ? "organization": "",
        is_active: true
    });
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

    const usersErrorFields = [
        setUsernameEmptyError,
        setUsernameLengthError,
        setBankEmptyError,
        setEmailEmptyError,
        setInvalidEmailError,
        setRoleEmptyError,
        setPasswordEmptyError,
        setInvalidPasswordError
    ];

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const responseRoles = await getRoles(urls.GET_ROLES_URL);

                if (responseRoles.message === "success") {
                    setRoles(responseRoles.roles)
                } else if (responseRoles.message === "invalid token") {
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
        fetchRoles();
    }, []);

    const onClickAddButton = async () => {
        resetPrevValidations(usersErrorFields);

        if (!checkFieldsValidation(newUserData, usersErrorFields)) {
            console.log("New user data: ", JSON.stringify(newUserData, null, 2));
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
                    {role === "admin" &&
                        <SelectComponent label={t("banks.bank")}
                                         chooseData={Object.values(banks)}
                                         fields={newUserData}
                                         setField={setNewUserData}
                                         changeFieldName={"bank"}
                                         width={"223px"}
                                         marginTop={"10px"}
                                         existsError={bankEmptyError}
                                         errorText={t("searchArea.emptyFieldError")} />
                    }                    
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
                    {role === "admin" &&
                        <SelectComponent label={t("userSection.role")}
                                         chooseData={roles}
                                         fields={newUserData}
                                         setField={setNewUserData}
                                         changeFieldName={"role"}
                                         width={"223px"}
                                         marginTop={"10px"}
                                         existsError={roleEmptyError}
                                         errorText={t("searchArea.emptyFieldError")} />
                    }
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