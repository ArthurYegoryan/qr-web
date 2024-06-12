import "./AddNewBank.css";
import TextInput from "../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import { useState } from "react";
import addNewBank from "../../../../api/addNewBank";
import { urls } from "../../../../constants/urls/urls";
import { logoutUser } from "../../../../redux/slices/authorization/authSlice";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ModalComponent from "../../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import Button from "../../../../generalComponents/buttons/Button";
import { emailValidation } from "../../../../utils/fieldsValidations/userDataFieldsValidation";
import { armenianValidation, russianValidation, englishValidation } from "../../../../utils/fieldsValidations/bankDataFieldsValidation";
import { useTranslation } from 'react-i18next';

const AddNewTerminalData = ({
    setIsBankDataChanged, 
    isBankDataChanged,
    onCloseHandler
}) => {
    const [ openCloseErrorModal, setOpenCloseErrorModal ] = useState(false);
    const [ newBankData, setNewBankData ] = useState({
        short_name: "",
        name_am: "",
        name_en: "",
        name_ru: "",
        email: "",
        secondEmail: "",
        is_active: true,
        url: "",
        is_owner: true,
    });
    const [ shortNameEmptyError, setShortNameEmptyError ] = useState(false);
    const [ nameAmEmptyError, setNameAmEmptyError ] = useState(false);
    const [ nameAmLanguageError, setNameAmLanguageError ] = useState(false);
    const [ nameEnEmptyError, setNameEnEmptyError ] = useState(false);
    const [ nameEnLanguageError, setNameEnLanguageError ] = useState(false);
    const [ nameRuEmptyError, setNameRuEmptyError ] = useState(false);
    const [ nameRuLanguageError, setNameRuLanguageError ] = useState(false);
    const [ emailEmptyError, setEmailEmptyError ] = useState(false);
    const [ invalidEmailError, setInvalidEmailError ] = useState(false);
    const [ invalidSecondEmailError, setInvalidSecondEmailError ] = useState(false);

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const checkFieldsValidation = ({ short_name, name_am, name_en, name_ru, email, secondEmail }) => {
        let existsError = false;

        if (!short_name.length) {
            existsError = true;
            setShortNameEmptyError(true);
        }
        if (!name_am.length) {
            existsError = true;
            setNameAmEmptyError(true);
        } else {
            if (!armenianValidation(name_am)) {
                existsError = true;
                setNameAmLanguageError(true);
            }
        }
        if (!name_ru.length) {
            existsError = true;
            setNameRuEmptyError(true);
        } else {
            if (!russianValidation(name_ru)) {
                existsError = true;
                setNameRuLanguageError(true);
            }
        }
        if (!name_en.length) {
            existsError = true;
            setNameEnEmptyError(true);
        } else {
            if (!englishValidation(name_en)) {
                existsError = true;
                setNameEnLanguageError(true);
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
        if (secondEmail.length) {
            if (!emailValidation(secondEmail)) {
                existsError = true;
                setInvalidSecondEmailError(true);
            }
        }

        return existsError;
    };

    const resetPrevValidations = () => {
        setShortNameEmptyError(false);
        setNameAmEmptyError(false);
        setNameAmLanguageError(false);
        setNameRuEmptyError(false);
        setNameRuLanguageError(false);
        setNameEnEmptyError(false);
        setNameEnLanguageError(false);
        setEmailEmptyError(false);
        setInvalidEmailError(false);
        setInvalidSecondEmailError(false);
    };

    const onClickAddButton = async () => {
        resetPrevValidations();

        if (!checkFieldsValidation(newBankData)) {
            const responseAddNewBank = await addNewBank(urls.POST_NEW_BANK_URL, newBankData);

            if (responseAddNewBank.message === "success") {
                setIsBankDataChanged(!isBankDataChanged);
                onCloseHandler();
            } else if (responseAddNewBank.message === "invalid token") {
                localStorage.clear();
                dispatch(logoutUser());

                <Navigate to="/login" />;
            } else {
                throw Error("Connection error!");
            }
        }
    };

    return (
        <>
            <div className="add-bank-data-area">
                <div className="add-bank-data-content">
                    <TextInput label={t("banks.shortName")}
                               existsError={shortNameEmptyError}
                               errorText={t("searchArea.emptyFieldError")}
                               onChangeHandler={(evt) => setNewBankData({
                                   ...newBankData,
                                   short_name: evt.target.value
                               })} />
                    <TextInput label={t("banks.nameAm")}
                               marginTop={"10px"}
                               existsError={nameAmEmptyError || nameAmLanguageError}
                               errorText={
                                   nameAmEmptyError ? t("searchArea.emptyFieldError") :
                                   nameAmLanguageError ? t("banks.onlyArmenian") : null
                               }
                               onChangeHandler={(evt) => setNewBankData({
                                   ...newBankData,
                                   name_am: evt.target.value
                               })} />
                    <TextInput label={t("banks.nameRu")}
                               marginTop={"10px"}
                               existsError={nameRuEmptyError || nameRuLanguageError}
                               errorText={
                                   nameRuEmptyError ? t("searchArea.emptyFieldError") :
                                   nameRuLanguageError ? t("banks.onlyRussian") : null
                               }
                               onChangeHandler={(evt) => setNewBankData({
                                   ...newBankData,
                                   name_ru: evt.target.value
                               })} />
                    <TextInput label={t("banks.nameEn")}
                               marginTop={"10px"}
                               existsError={nameEnEmptyError || nameEnLanguageError}
                               errorText={
                                   nameEnEmptyError ? t("searchArea.emptyFieldError") :
                                   nameEnLanguageError ? t("banks.onlyEnglish") : null
                               }
                               onChangeHandler={(evt) => setNewBankData({
                                   ...newBankData,
                                   name_en: evt.target.value
                               })} />
                    <TextInput label={t("userSection.email")}
                               marginTop={"10px"}
                               existsError={emailEmptyError || invalidEmailError}
                               errorText={
                                   emailEmptyError ? t("searchArea.emptyFieldError") :
                                   invalidEmailError ? t("userSection.invalidEmail") : null
                               }
                               onChangeHandler={(evt) => setNewBankData({
                                   ...newBankData,
                                   email: evt.target.value
                               })} />
                    <TextInput label={t("banks.secondEmail")}
                               marginTop={"10px"}
                               existsError={invalidSecondEmailError}
                               errorText={t("userSection.invalidEmail")}
                               onChangeHandler={(evt) => setNewBankData({
                                   ...newBankData,
                                   secondEmail: evt.target.value
                               })} />
                    <TextInput label={t("banks.url")}
                               marginTop={"10px"}
                               existsError={invalidSecondEmailError}
                               errorText={t("userSection.invalidEmail")}
                               onChangeHandler={(evt) => setNewBankData({
                                   ...newBankData,
                                   secondEmail: evt.target.value
                               })} />
                </div>
                <div className="add-bank-data-buttons">
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

export default AddNewTerminalData;