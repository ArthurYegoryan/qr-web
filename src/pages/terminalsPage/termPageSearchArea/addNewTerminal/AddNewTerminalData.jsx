import "./AddNewTerminalData.css";
import Button from "../../../../generalComponents/buttons/Button";
import TextInput from "../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../../generalComponents/inputFields/selectComponent/SelectComponent";
import CheckBoxLabels from "../../../../generalComponents/inputFields/checkbox/CheckBoxComponent";
import ModalComponent from "../../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import SuccessModal from "../../../../generalComponents/modalComponent/successModalBody/SuccessModalBody";
import addNewTerminal from "../../../../api/addNewTerminal";
import { useState } from "react";
import { urls } from "../../../../constants/urls/urls";
import { logoutUser } from "../../../../redux/slices/authorization/authSlice";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { serialValidation, midTidValidation, mccValidation, taxValidation } from 
                                    "../../../../utils/fieldsValidations/termDataFieldsValidation";
import { useTranslation } from 'react-i18next';

const AddNewTerminalData = ({
    setIsTermDataChanged, 
    isTermDataChanged,
    onCloseHandler
}) => {
    const { role } = useSelector((state) => state.auth);
    const { banks } = useSelector((state) => state.banks);
    const { terminalTypes } = useSelector((state) => state.terminalTypes);
    const { paymentSystems } = useSelector((state) => state.paymentSystems);
    const [ newTerminalData, setNewTerminalData ] = useState({
        serial: "",
        tid: "",
        mid: "",
        posType: "",
        mcc: "",
        tax: "",
        merchantName: "",
        merchantNameInAm: "",
        merchantAddress: "",
        merchantAddressInAm: "",
        merchantCity: "",
        merchantCityInAm: "",
        merchantPhoneNumber: "",
        merchantWebPage: "",
        merchantEmail: "",
        active: true,
        bank: "",
        paymentSystem: "",
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
    const [ emptyPaySysError, setEmptyPaySysError ] = useState(false);
    const [ openCloseSuccessModal, setOpenCloseSuccessModal ] = useState(false);
    const [ openCloseErrorModal, setOpenCloseErrorModal ] = useState(false);

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const paySysList = [];
    paymentSystems.payload.map((paysys) => {
        paySysList.push(paysys.short_name);
    });

    const checkFieldsValidation = ({ serial, tid, mid, posType, mcc, tax, merchantName, merchantNameInAm, merchantAddress, 
                                     merchantAddressInAm, merchantCity, merchantCityInAm, bank, paymentSystem }) => {
        let existsError = false;

        if (!serial.length) {
            existsError = true;
            setEmptySerialError(true);
        } else {
            if (!serialValidation(serial)) {
                existsError = true;
                setInvalidSerialError(true);
            }
        }
        if (!tid.length) {
            existsError = true;
            setEmptyTidError(true);
        } else {
            if (!midTidValidation(tid)) {
                existsError = true;
                setInvalidTidError(true);
            }
        }
        if (!mid.length) {
            existsError = true;
            setEmptyMidError(true);
        } else {
            if (!midTidValidation(mid)) {
                existsError = true;
                setInvalidMidError(true);
            }
        }
        if (!posType.length) {
            existsError = true;
            setEmptyPosTypeError(true);
        }
        if (!mcc.length) {
            existsError = true;
            setEmptyMccError(true);
        } else {
            if (!mccValidation(mcc)) {
                existsError = true;
                setInvalidMccError(true);
            }
        }
        if (!tax.length) {
            existsError = true;
            setEmptyTaxError(true);
        } else {
            if (!taxValidation(tax)) {
                existsError = true;
                setInvalidTaxError(true);
            }
        }
        if (!merchantName.length) {
            existsError = true;
            setEmptyMerchantNameError(true);
        }
        if (!merchantNameInAm.length) {
            existsError = true;
            setEmptyMerchantNameInAmError(true);
        }
        if (!merchantAddress.length) {
            existsError = true;
            setEmptyMerchantAddressError(true);
        }
        if (!merchantAddressInAm.length) {
            existsError = true;
            setEmptyMerchantAddressInAmError(true);
        }
        if (!merchantCity.length) {
            existsError = true;
            setEmptyMerchantCityError(true);
        }
        if (!merchantCityInAm.length) {
            existsError = true;
            setEmptyMerchantCityInAmError(true);
        }
        if (!bank.length) {
            existsError = true;
            setEmptyBankError(true);
        }
        if (!paymentSystem.length) {
            existsError = true;
            setEmptyPaySysError(true);
        }

        return existsError;
    };

    const resetPrevValidations = () => {
        setEmptySerialError(false);
        setInvalidSerialError(false);
        setEmptyTidError(false);
        setInvalidTidError(false);
        setEmptyMidError(false);
        setInvalidMidError(false);
        setEmptyMccError(false);
        setInvalidMccError(false);
        setEmptyTaxError(false);
        setInvalidTaxError(false);
        setEmptyMerchantNameError(false);
        setEmptyMerchantNameInAmError(false);
        setEmptyMerchantAddressError(false);
        setEmptyMerchantAddressInAmError(false);
        setEmptyMerchantCityError(false);
        setEmptyMerchantCityInAmError(false);
        setEmptyBankError(false);
        setEmptyPaySysError(false);
    };

    const onClickAddButton = async () => {
        resetPrevValidations();

        if (!checkFieldsValidation(newTerminalData)) {
            const responseAddNewTerminal = await addNewTerminal(urls.POST_NEW_TERMINAL_URL, newTerminalData);

            if (responseAddNewTerminal.message === "success") {
                setIsTermDataChanged(!isTermDataChanged);
                setOpenCloseSuccessModal(true);
                setTimeout(() => {
                    onCloseHandler();
                }, 3000);
            } else if (responseAddNewTerminal.message === "invalid token") {
                localStorage.clear();
                dispatch(logoutUser());

                <Navigate to="/login" />;
            } else {
                throw Error("Connection error!");
            }
        }
    };

    return (
        <div className="add-term-data-area">
            <div className="add-term-data-content">
                <div className="add-term-data-fields">
                    <TextInput label={t("terminalsSection.serialNumber")}
                                existsError={emptySerialError || invalidSerialError}
                                errorText={
                                    emptySerialError ? t("searchArea.emptyFieldError") :
                                    invalidSerialError ? t("terminalsSection.invalidSerial") : null
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    serial: evt.target.value
                                })} />
                    <TextInput label={t("terminalsSection.tid")}
                                marginTop={"10px"}
                                existsError={emptyTidError || invalidTidError}
                                errorText={
                                    emptyTidError ? t("searchArea.emptyFieldError") :
                                    invalidTidError ? t("terminalsSection.invalidTid") : null
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    tid: evt.target.value
                                })} />
                    <TextInput label={t("terminalsSection.mid")}
                                marginTop={"10px"}
                                existsError={emptyMidError || invalidMidError}
                                errorText={
                                    emptyMidError ? t("searchArea.emptyFieldError") :
                                    invalidMidError ? t("terminalsSection.invalidMid") : null
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    mid: evt.target.value
                                })} />
                    <SelectComponent label={t("terminalsSection.posType")}
                                        chooseData={terminalTypes.payload}
                                        fields={newTerminalData}
                                        setField={setNewTerminalData}
                                        changeFieldName={"posType"}
                                        width={"223px"}
                                        marginTop={"10px"}
                                        existsError={emptyPosTypeError}
                                        errorText={t("searchArea.emptyFieldError")} />
                    <TextInput label={t("terminalsSection.mcc")}
                                marginTop={"10px"}
                                existsError={emptyMccError || invalidMccError}
                                errorText={
                                    emptyMccError ? t("searchArea.emptyFieldError") :
                                    invalidMccError ? t("terminalsSection.invalidMcc") : null
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    mcc: evt.target.value
                                })} />
                    <TextInput label={t("terminalsSection.tax")}
                                marginTop={"10px"}
                                existsError={emptyTaxError || invalidTaxError}
                                errorText={
                                    emptyTaxError ? t("searchArea.emptyFieldError") :
                                    invalidTaxError ? t("terminalsSection.invalidTax") : null
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    tax: evt.target.value
                                })} />
                </div>
                <div className="add-term-data-fields">
                    <TextInput label={t("terminalsSection.merchantName")}
                                width="340px"
                                existsError={emptyMerchantNameError}
                                errorText={
                                    emptyMerchantNameError && t("searchArea.emptyFieldError")
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchantName: evt.target.value
                                })} />
                    <TextInput label={t("terminalsSection.merchantNameAm")}
                                marginTop={"10px"}
                                width="340px"
                                existsError={emptyMerchantNameInAmError}
                                errorText={
                                    emptyMerchantNameInAmError && t("searchArea.emptyFieldError")
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchantNameInAm: evt.target.value
                                })} />
                    <TextInput label={t("terminalsSection.merchantAddress")}
                                marginTop={"10px"}
                                width="340px"
                                existsError={emptyMerchantAddressError}
                                errorText={
                                    emptyMerchantAddressError && t("searchArea.emptyFieldError")
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchantAddress: evt.target.value
                                })} />
                    <TextInput label={t("terminalsSection.merchantAddressAm")}
                                marginTop={"10px"}
                                width="340px"
                                existsError={emptyMerchantAddressInAmError}
                                errorText={
                                    emptyMerchantAddressInAmError && t("searchArea.emptyFieldError")
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchantAddressInAm: evt.target.value
                                })} />
                    <TextInput label={t("terminalsSection.merchantCity")}
                                marginTop={"10px"}
                                width="340px"
                                existsError={emptyMerchantCityError}
                                errorText={
                                    emptyMerchantCityError && t("searchArea.emptyFieldError")
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchantCity: evt.target.value
                                })} />
                    <TextInput label={t("terminalsSection.merchantCityAm")}
                                marginTop={"10px"}
                                width="340px"
                                existsError={emptyMerchantCityInAmError}
                                errorText={
                                    emptyMerchantCityInAmError && t("searchArea.emptyFieldError")
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchantCityInAm: evt.target.value
                                })} />
                </div>
                <div className="add-term-data-fields">
                    <TextInput label={t("terminalsSection.merchantPhoneNumber")}
                                width="340px"
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchantPhoneNumber: evt.target.value
                                })} />
                    <TextInput label={t("terminalsSection.merchantWebPage")}
                                marginTop={"10px"}
                                width="340px"
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchantWebPage: evt.target.value
                                })} />
                    <TextInput label={t("terminalsSection.merchantEmail")}
                                marginTop={"10px"}
                                width="340px"
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchantEmail: evt.target.value
                                })} />
                    <CheckBoxLabels label={t("banks.isActive")}
                                    defaultChecked={true}
                                    onChangeHandler={(evt) => setNewTerminalData({
                                        ...newTerminalData,
                                        active: evt.target.value
                                    })} />
                    {role === "admin" &&
                        <>
                            <SelectComponent label={t("banks.bank")}
                                            chooseData={Object.values(banks.payload)}
                                            fields={newTerminalData}
                                            setField={setNewTerminalData}
                                            changeFieldName={"bank"}
                                            width={"223px"}
                                            marginTop={"10px"}
                                            existsError={emptyBankError}
                                            errorText={t("searchArea.emptyFieldError")} />
                            <SelectComponent label={t("terminalsSection.paymentSystem")}
                                            chooseData={paySysList}
                                            fields={newTerminalData}
                                            setField={setNewTerminalData}
                                            changeFieldName={"paymentSystem"}
                                            width={"223px"}
                                            marginTop={"10px"}
                                            existsError={emptyPaySysError}
                                            errorText={t("searchArea.emptyFieldError")} />
                        </>
                    }
                </div>
            </div>
            <div className="add-term-data-buttons">
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
            {openCloseSuccessModal &&
                <SuccessModal />
            }
            {openCloseErrorModal &&
            <ModalComponent onCloseHandler={setOpenCloseErrorModal}
                            isOpen={true}
                            title="Connection failed"
                            body={<ErrorModalBody />}
                            bgcolor="red" />
            }
        </div>
    );
};

export default AddNewTerminalData;