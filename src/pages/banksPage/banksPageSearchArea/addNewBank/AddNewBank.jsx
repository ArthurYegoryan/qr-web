import "./AddNewBank.css";
import Button from "../../../../generalComponents/buttons/Button";
import TextInput from "../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import CheckBoxLabels from "../../../../generalComponents/inputFields/checkbox/CheckBoxComponent";
import ModalComponent from "../../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import SuccessModalBody from "../../../../generalComponents/modalComponent/successModalBody/SuccessModalBody";
import addNewBank from "../../../../testApis/addNewBank";
import { checkFieldsValidation } from "../../../../utils/fieldsValidations/checkBankDataFieldsValidation";
import { resetPrevValidations } from "../../../../utils/fieldsValidations/resetPrevValidations";
import { urls } from "../../../../constants/urls/urls";
import { editToken } from "../../../../redux/slices/authorization/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const AddNewTerminalData = ({
    setIsBankDataChanged, 
    isBankDataChanged,
    onCloseHandler
}) => {
    const [ openCloseErrorModal, setOpenCloseErrorModal ] = useState(false);
    const [ openCloseSuccessModal, setOpenCloseSuccessModal ] = useState(false);
    const [ newBankData, setNewBankData ] = useState({
        short_name: "",
        name_am: "",
        name_en: "",
        name_ru: "",
        email: "",
        secondEmail: "",
        is_active: true,
        url: "",
        is_owner: false,
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

    const banksErrorFields = [
        setShortNameEmptyError,
        setNameAmEmptyError,
        setNameAmLanguageError,
        setNameRuEmptyError,
        setNameRuLanguageError,
        setNameEnEmptyError,
        setNameEnLanguageError,
        setEmailEmptyError,
        setInvalidEmailError,
        setInvalidSecondEmailError,
    ];
    
    const onClickAddButton = async () => {
        resetPrevValidations(banksErrorFields);

        if (!checkFieldsValidation(newBankData, banksErrorFields)) {
            const responseAddNewBank = await addNewBank(urls.POST_NEW_BANK_URL, newBankData);

            if (responseAddNewBank.message === "success") {
                setIsBankDataChanged(!isBankDataChanged);
                setOpenCloseSuccessModal(true);
                setTimeout(() => {
                    onCloseHandler();
                }, 3000);
                
            } else if (responseAddNewBank.message === "invalid token") {
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
                               onChangeHandler={(evt) => setNewBankData({
                                   ...newBankData,
                                   url: evt.target.value
                               })} />
                    <CheckBoxLabels label={t("banks.isActive")}
                                    defaultChecked={true}
                                    onChangeHandler={(evt) => setNewBankData({
                                        ...newBankData,
                                        is_active: evt.target.value
                                    })} />
                    <CheckBoxLabels label={t("banks.isOwner")}
                                    defaultChecked={false}
                                    onChangeHandler={(evt) => setNewBankData({
                                        ...newBankData,
                                        is_owner: evt.target.value
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

export default AddNewTerminalData;