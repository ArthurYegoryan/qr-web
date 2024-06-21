import "./ChangeBankData.css";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import CheckBoxLabels from "../../../generalComponents/inputFields/checkbox/CheckBoxComponent";
import { useState } from "react";
import changeBankData from "../../../api/changeBankData";
import { urls } from "../../../constants/urls/urls";
import { editToken } from "../../../redux/slices/authorization/authSlice";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import SuccessModalBody from "../../../generalComponents/modalComponent/successModalBody/SuccessModalBody";
import Button from "../../../generalComponents/buttons/Button";
import { emailValidation } from "../../../utils/fieldsValidations/userDataFieldsValidation";
import { armenianValidation, russianValidation, englishValidation } from "../../../utils/fieldsValidations/bankDataFieldsValidation";
import { isChangedAnyData } from "../../../utils/helpers/isChangedAnyData";
import { useTranslation } from 'react-i18next';

const ChangeBankData = ({
    bank,
    setIsBankDataChanged, 
    isBankDataChanged,
    onCloseHandler
}) => {
    const [ openCloseErrorModal, setOpenCloseErrorModal ] = useState(false);
    const [ openCloseSuccessModal, setOpenCloseSuccessModal ] = useState(false);
    const [ changedBankData, setChangedBankData ] = useState({
        id: bank.id,
        short_name: bank.short_name,
        name_am: bank.name_am,
        name_en: bank.name_en,
        name_ru: bank.name_ru,
        email: bank.email,
        secondEmail: bank.secondEmail,
        is_active: bank.is_active === "true" ? true : false,
        url: bank.url,
        is_owner: bank.is_owner === "true" ? true : false,
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

    const onClickSaveButton = async () => {
        resetPrevValidations();
        
        if (isChangedAnyData(bank, changedBankData) && !checkFieldsValidation(changedBankData)) {
            const responseChangeBank = await changeBankData(urls.PUT_BANK_DATA_URL, changedBankData);

            if (responseChangeBank.message === "success") {
                setIsBankDataChanged(!isBankDataChanged);
                setOpenCloseSuccessModal(true);
                setTimeout(() => {
                    onCloseHandler();
                }, 3000);
                
            } else if (responseChangeBank.message === "invalid token") {
                localStorage.clear();
                dispatch(editToken(""));

                <Navigate to="/login" />;
            } else {
                throw Error("Connection error!");
            }
        } else {
            onCloseHandler();
        }
    };

    return (
        <>
            <div className="change-bank-data-area">
                <div className="change-bank-data-content">
                    <TextInput label={t("banks.shortName")}
                               defaultValue={bank.short_name}
                               existsError={shortNameEmptyError}
                               errorText={t("searchArea.emptyFieldError")}
                               onChangeHandler={(evt) => setChangedBankData({
                                   ...changedBankData,
                                   short_name: evt.target.value
                               })} />
                    <TextInput label={t("banks.nameAm")}
                               defaultValue={bank.name_am}
                               marginTop={"10px"}
                               existsError={nameAmEmptyError || nameAmLanguageError}
                               errorText={
                                   nameAmEmptyError ? t("searchArea.emptyFieldError") :
                                   nameAmLanguageError ? t("banks.onlyArmenian") : null
                               }
                               onChangeHandler={(evt) => setChangedBankData({
                                   ...changedBankData,
                                   name_am: evt.target.value
                               })} />
                    <TextInput label={t("banks.nameRu")}
                               defaultValue={bank.name_ru}
                               marginTop={"10px"}
                               existsError={nameRuEmptyError || nameRuLanguageError}
                               errorText={
                                   nameRuEmptyError ? t("searchArea.emptyFieldError") :
                                   nameRuLanguageError ? t("banks.onlyRussian") : null
                               }
                               onChangeHandler={(evt) => setChangedBankData({
                                   ...changedBankData,
                                   name_ru: evt.target.value
                               })} />
                    <TextInput label={t("banks.nameEn")}
                               defaultValue={bank.name_en}
                               marginTop={"10px"}
                               existsError={nameEnEmptyError || nameEnLanguageError}
                               errorText={
                                   nameEnEmptyError ? t("searchArea.emptyFieldError") :
                                   nameEnLanguageError ? t("banks.onlyEnglish") : null
                               }
                               onChangeHandler={(evt) => setChangedBankData({
                                   ...changedBankData,
                                   name_en: evt.target.value
                               })} />
                    <TextInput label={t("userSection.email")}
                               defaultValue={bank.email}
                               marginTop={"10px"}
                               existsError={emailEmptyError || invalidEmailError}
                               errorText={
                                   emailEmptyError ? t("searchArea.emptyFieldError") :
                                   invalidEmailError ? t("userSection.invalidEmail") : null
                               }
                               onChangeHandler={(evt) => setChangedBankData({
                                   ...changedBankData,
                                   email: evt.target.value
                               })} />
                    <TextInput label={t("banks.secondEmail")}
                               defaultValue={bank.secondEmail}
                               marginTop={"10px"}
                               existsError={invalidSecondEmailError}
                               errorText={t("userSection.invalidEmail")}
                               onChangeHandler={(evt) => setChangedBankData({
                                   ...changedBankData,
                                   secondEmail: evt.target.value
                               })} />
                    <TextInput label={t("banks.url")}
                               defaultValue={bank.url}
                               marginTop={"10px"}
                               onChangeHandler={(evt) => setChangedBankData({
                                   ...changedBankData,
                                   url: evt.target.value
                               })} />
                    <CheckBoxLabels label={t("banks.isActive")}
                                    defaultChecked={bank.is_active === "true" ? true : false}
                                    onChangeHandler={(evt) => setChangedBankData({
                                        ...changedBankData,
                                        is_active: evt.target.value
                                    })} />
                    <CheckBoxLabels label={t("banks.isOwner")}
                                    defaultChecked={bank.is_owner === "true" ? true : false}
                                    onChangeHandler={(evt) => setChangedBankData({
                                        ...changedBankData,
                                        is_owner: evt.target.value
                                    })} />
                </div>
                <div className="change-bank-data-buttons">
                    <Button label={t("changeTerminalData.saveBtn")} 
                            marginRight="10px"
                            backgroundColor="green"
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

export default ChangeBankData;