import "./ChangeTerminalData.css";
import Button from "../../../generalComponents/buttons/Button";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../generalComponents/inputFields/selectComponent/SelectComponent";
import CheckBoxLabels from "../../../generalComponents/inputFields/checkbox/CheckBoxComponent";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import SuccessModal from "../../../generalComponents/modalComponent/successModalBody/SuccessModalBody";
import changeTerminalData from "../../../testApis/changeTerminalData";
import { isChangedAnyData } from "../../../utils/helpers/isChangedAnyData";
import { checkFieldsValidation } from "../../../utils/fieldsValidations/checkTermDataFieldsValidation";
import { resetPrevValidations } from "../../../utils/fieldsValidations/resetPrevValidations";
import { urls } from "../../../constants/urls/urls";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { editToken } from "../../../redux/slices/authorization/authSlice";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const ChangeTerminalData = ({ 
    terminal, 
    setIsTermDataChanged, 
    isTermDataChanged,
    onCloseHandler
}) => {
    const role = useSelector((state) => state.auth.role.payload) ?? localStorage.getItem("role");
    const { banks } = useSelector((state) => state.banks);
    const { terminalTypes } = useSelector((state) => state.terminalTypes);
    const { paymentSystems } = useSelector((state) => state.paymentSystems);
    const [ terminalData, setTerminalData ] = useState({
        id: terminal.id,
        serial: terminal.serial,
        tid: terminal.tid,
        mid: terminal.mid,
        pos_type: terminal.pos_type,
        mcc: terminal.mcc,
        merchant_tax_number: terminal.merchant_tax_number,
        merchant_name: terminal.merchant_name,
        merchant_name_in_am: terminal.merchant_name_in_am,
        merchant_address: terminal.merchant_address,
        merchant_address_in_am: terminal.merchant_address_in_am,
        merchant_city: terminal.merchant_city,
        merchant_city_in_am: terminal.merchant_city_in_am,
        merchant_phone_number: terminal.merchant_phone_number,
        merchant_web_page: terminal.merchant_web_page,
        merchant_email: terminal.merchant_email,
        active: terminal.active,
        bank: terminal.bank,
        payment_system: terminal.paymentSystem ?? "",
    });
    const [ emptySerialError, setEmptySerialError ] = useState(false);
    const [ invalidSerialError, setInvalidSerialError ] = useState(false);
    const [ emptyTidError, setEmptyTidError ] = useState(false);
    const [ invalidTidError, setInvalidTidError ] = useState(false);
    const [ emptyMidError, setEmptyMidError ] = useState(false);
    const [ invalidMidError, setInvalidMidError ] = useState(false);
    const [ emptyPosTypeError, setEmptyPosTypeError ] = useState(false);
    const [ emptyMccError, setEmptyMccError ] = useState(false);
    const [ invalidMccError, setInvalidMccError ] = useState(false);
    const [ emptyTaxError, setEmptyTaxError ] = useState(false);
    const [ invalidTaxError, setInvalidTaxError ] = useState(false);
    const [ emptyMerchantNameError, setEmptyMerchantNameError ] = useState(false);
    const [ emptyMerchantNameInAmError, setEmptyMerchantNameInAmError ] = useState(false);
    const [ emptyMerchantAddressError, setEmptyMerchantAddressError ] = useState(false);
    const [ emptyMerchantAddressInAmError, setEmptyMerchantAddressInAmError ] = useState(false);
    const [ emptyMerchantCityError, setEmptyMerchantCityError ] = useState(false);
    const [ emptyMerchantCityInAmError, setEmptyMerchantCityInAmError ] = useState(false);
    const [ emptyBankError, setEmptyBankError ] = useState(false);
    const [ openCloseSuccessModal, setOpenCloseSuccessModal ] = useState(false);
    const [ openCloseErrorModal, setOpenCloseErrorModal ] = useState(false);

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const paySysList = [];
    paymentSystems.payload.map((paysys) => {
        paySysList.push(paysys.short_name);
    });

    const terminalsErrorFields = [
        setEmptySerialError,
        setInvalidSerialError,
        setEmptyTidError,
        setInvalidTidError,
        setEmptyMidError,
        setInvalidMidError,
        setEmptyPosTypeError,
        setEmptyMccError,
        setInvalidMccError,
        setEmptyTaxError,
        setInvalidTaxError,
        setEmptyMerchantNameError,
        setEmptyMerchantNameInAmError,
        setEmptyMerchantAddressError,
        setEmptyMerchantAddressInAmError,
        setEmptyMerchantCityError,
        setEmptyMerchantCityInAmError,
        setEmptyBankError,
    ];

    const onClickSaveButton = async () => {
        resetPrevValidations(terminalsErrorFields);

        if (!checkFieldsValidation(terminalData, terminalsErrorFields)) {
            if (isChangedAnyData(terminal, terminalData)) {
                const responseChangeTermData = await changeTerminalData(urls.PUT_TERMINAL_DATA_URL, terminalData);

                if (responseChangeTermData.message === "success") {
                    setIsTermDataChanged(!isTermDataChanged);
                    setOpenCloseSuccessModal(true);
                    setTimeout(() => {
                        onCloseHandler();
                    }, 3000);
                } else if (responseChangeTermData.message === "invalid token") {
                    localStorage.clear();
                    dispatch(editToken(""));

                    <Navigate to="/login" />;
                } else {
                    throw Error("Connection error!");
                }
            } else {
                onCloseHandler();
            }            
        }
    };

    return (
        <>
            <div className="change-term-data-area">
                <div className="change-term-data-content">
                    <div className="change-term-data-fields">
                        <TextInput label={t("terminalsSection.serialNumber")}
                                    defaultValue={terminal.serial}
                                    existsError={emptySerialError || invalidSerialError}
                                    errorText={
                                        emptySerialError ? t("searchArea.emptyFieldError") :
                                        invalidSerialError ? t("terminalsSection.invalidSerial") : null
                                    }
                                    onChangeHandler={(evt) => setTerminalData({
                                        ...terminalData,
                                        serial: evt.target.value
                                    })} />
                        <TextInput label={t("terminalsSection.tid")}
                                    marginTop={"10px"}
                                    defaultValue={terminal.tid}
                                    existsError={emptyTidError || invalidTidError}
                                    errorText={
                                        emptyTidError ? t("searchArea.emptyFieldError") :
                                        invalidTidError ? t("terminalsSection.invalidTid") : null
                                    }
                                    onChangeHandler={(evt) => setTerminalData({
                                        ...terminalData,
                                        tid: evt.target.value
                                    })} />
                        <TextInput label={t("terminalsSection.mid")}
                                    defaultValue={terminal.mid}
                                    marginTop={"10px"}
                                    existsError={emptyMidError || invalidMidError}
                                    errorText={
                                        emptyMidError ? t("searchArea.emptyFieldError") :
                                        invalidMidError ? t("terminalsSection.invalidMid") : null
                                    }
                                    onChangeHandler={(evt) => setTerminalData({
                                        ...terminalData,
                                        mid: evt.target.value
                                    })} />
                        <SelectComponent label={t("terminalsSection.posType")}
                                            defaultValue={terminal.pos_type}
                                            chooseData={terminalTypes.payload}
                                            fields={terminalData}
                                            setField={setTerminalData}
                                            changeFieldName={"pos_type"}
                                            width={"223px"}
                                            marginTop={"10px"}
                                            existsError={emptyPosTypeError}
                                            errorText={t("searchArea.emptyFieldError")} />
                        <TextInput label={t("terminalsSection.mcc")}
                                    defaultValue={terminal.mcc}
                                    marginTop={"10px"}
                                    existsError={emptyMccError || invalidMccError}
                                    errorText={
                                        emptyMccError ? t("searchArea.emptyFieldError") :
                                        invalidMccError ? t("terminalsSection.invalidMcc") : null
                                    }
                                    onChangeHandler={(evt) => setTerminalData({
                                        ...terminalData,
                                        mcc: evt.target.value
                                    })} />
                        <TextInput label={t("terminalsSection.tax")}
                                    defaultValue={terminal.merchant_tax_number}
                                    marginTop={"10px"}
                                    existsError={emptyTaxError || invalidTaxError}
                                    errorText={
                                        emptyTaxError ? t("searchArea.emptyFieldError") :
                                        invalidTaxError ? t("terminalsSection.invalidTax") : null
                                    }
                                    onChangeHandler={(evt) => setTerminalData({
                                        ...terminalData,
                                        merchant_tax_number: evt.target.value
                                    })} />
                    </div>
                    <div className="change-term-data-fields">
                        <TextInput label={t("terminalsSection.merchantName")}
                                    defaultValue={terminal.merchant_name}
                                    width="340px"
                                    existsError={emptyMerchantNameError}
                                    errorText={
                                        emptyMerchantNameError && t("searchArea.emptyFieldError")
                                    }
                                    onChangeHandler={(evt) => setTerminalData({
                                        ...terminalData,
                                        merchant_name: evt.target.value
                                    })} />
                        <TextInput label={t("terminalsSection.merchantNameAm")}
                                    defaultValue={terminal.merchant_name_in_am}
                                    marginTop={"10px"}
                                    width="340px"
                                    existsError={emptyMerchantNameInAmError}
                                    errorText={
                                        emptyMerchantNameInAmError && t("searchArea.emptyFieldError")
                                    }
                                    onChangeHandler={(evt) => setTerminalData({
                                        ...terminalData,
                                        merchant_name_in_am: evt.target.value
                                    })} />
                        <TextInput label={t("terminalsSection.merchantAddress")}
                                    defaultValue={terminal.merchant_address}
                                    marginTop={"10px"}
                                    width="340px"
                                    existsError={emptyMerchantAddressError}
                                    errorText={
                                        emptyMerchantAddressError && t("searchArea.emptyFieldError")
                                    }
                                    onChangeHandler={(evt) => setTerminalData({
                                        ...terminalData,
                                        merchant_address: evt.target.value
                                    })} />
                        <TextInput label={t("terminalsSection.merchantAddressAm")}
                                    defaultValue={terminal.merchant_address_in_am}
                                    marginTop={"10px"}
                                    width="340px"
                                    existsError={emptyMerchantAddressInAmError}
                                    errorText={
                                        emptyMerchantAddressInAmError && t("searchArea.emptyFieldError")
                                    }
                                    onChangeHandler={(evt) => setTerminalData({
                                        ...terminalData,
                                        merchant_address_in_am: evt.target.value
                                    })} />
                        <TextInput label={t("terminalsSection.merchantCity")}
                                    defaultValue={terminal.merchant_city}
                                    marginTop={"10px"}
                                    width="340px"
                                    existsError={emptyMerchantCityError}
                                    errorText={
                                        emptyMerchantCityError && t("searchArea.emptyFieldError")
                                    }
                                    onChangeHandler={(evt) => setTerminalData({
                                        ...terminalData,
                                        merchant_city: evt.target.value
                                    })} />
                        <TextInput label={t("terminalsSection.merchantCityAm")}
                                    defaultValue={terminal.merchant_city_in_am}
                                    marginTop={"10px"}
                                    width="340px"
                                    existsError={emptyMerchantCityInAmError}
                                    errorText={
                                        emptyMerchantCityInAmError && t("searchArea.emptyFieldError")
                                    }
                                    onChangeHandler={(evt) => setTerminalData({
                                        ...terminalData,
                                        merchant_city_in_am: evt.target.value
                                    })} />
                    </div>
                    <div className="change-term-data-fields">
                        <TextInput label={t("terminalsSection.merchantPhoneNumber")}
                                    defaultValue={terminal.merchant_phone_number}
                                    width="340px"
                                    onChangeHandler={(evt) => setTerminalData({
                                        ...terminalData,
                                        merchantPhoneNumber: evt.target.value
                                    })} />
                        <TextInput label={t("terminalsSection.merchantWebPage")}
                                    defaultValue={terminal.merchant_web_page}
                                    marginTop={"10px"}
                                    width="340px"
                                    onChangeHandler={(evt) => setTerminalData({
                                        ...terminalData,
                                        merchant_web_page: evt.target.value
                                    })} />
                        <TextInput label={t("terminalsSection.merchantEmail")}
                                    defaultValue={terminal.merchant_email}
                                    marginTop={"10px"}
                                    width="340px"
                                    onChangeHandler={(evt) => setTerminalData({
                                        ...terminalData,
                                        merchant_email: evt.target.value
                                    })} />
                        <CheckBoxLabels label={t("banks.isActive")}
                                        defaultChecked={terminal.active}
                                        onChangeHandler={(evt) => setTerminalData({
                                            ...terminalData,
                                            active: evt.target.value
                                        })} />
                        {role === "admin" &&
                            <>
                                <SelectComponent label={t("banks.bank")}
                                                defaultValue={terminal.bank}
                                                chooseData={Object.values(banks.payload)}
                                                fields={terminalData}
                                                setField={setTerminalData}
                                                changeFieldName={"bank"}
                                                width={"223px"}
                                                marginTop={"10px"}
                                                existsError={emptyBankError}
                                                errorText={t("searchArea.emptyFieldError")} />
                                <SelectComponent label={t("terminalsSection.paymentSystem")}
                                                defaultValue={terminal.paymentSystem ?? ""}
                                                chooseData={paySysList}
                                                fields={terminalData}
                                                setField={setTerminalData}
                                                changeFieldName={"payment_system"}
                                                width={"223px"}
                                                marginTop={"10px"} />
                            </>
                        }
                    </div>
                </div>
                <div className="change-term-data-buttons">
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
                <SuccessModal />
            }
            {openCloseErrorModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseErrorModal(false)}
                                isOpen={openCloseErrorModal}
                                title="Connection failed!"
                                body={<ErrorModalBody />}
                                bgcolor="red" />
            }
        </>
    );
};

export default ChangeTerminalData;