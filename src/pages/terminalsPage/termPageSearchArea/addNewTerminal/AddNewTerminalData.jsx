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
import { editToken } from "../../../../redux/slices/authorization/authSlice";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { checkFieldsValidation } from "../../../../utils/fieldsValidations/checkTermDataFieldsValidation";
import { resetPrevValidations } from "../../../../utils/fieldsValidations/resetPrevValidations";

const AddNewTerminalData = ({
    setIsTermDataChanged, 
    isTermDataChanged,
    onCloseHandler
}) => {
    const role = useSelector((state) => state.auth.role.payload) ?? localStorage.getItem("role");
    const { banks } = useSelector((state) => state.banks);
    const { terminalTypes } = useSelector((state) => state.terminalTypes);
    const { paymentSystems } = useSelector((state) => state.paymentSystems);
    const [ newTerminalData, setNewTerminalData ] = useState({
        serial: "",
        tid: "",
        mid: "",
        pos_type: "",
        mcc: "",
        merchant_tax_number: "",
        merchant_name: "",
        merchant_name_in_am: "",
        merchant_address: "",
        merchant_address_in_am: "",
        merchant_city: "",
        merchant_city_in_am: "",
        merchant_phone_number: "",
        merchant_web_page: "",
        merchant_email: "",
        active: true,
        bank: "",
        payment_system: "",
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

    const onClickAddButton = async () => {
        resetPrevValidations(terminalsErrorFields);

        if (!checkFieldsValidation(newTerminalData, terminalsErrorFields)) {
            const responseAddNewTerminal = await addNewTerminal(urls.POST_NEW_TERMINAL_URL, newTerminalData);

            if (responseAddNewTerminal.message === "success") {
                setIsTermDataChanged(!isTermDataChanged);
                setOpenCloseSuccessModal(true);
                setTimeout(() => {
                    onCloseHandler();
                }, 3000);
            } else if (responseAddNewTerminal.message === "invalid token") {
                localStorage.clear();
                dispatch(editToken(""));

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
                                        changeFieldName={"pos_type"}
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
                                    merchant_tax_number: evt.target.value
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
                                    merchant_name: evt.target.value
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
                                    merchant_name_in_am: evt.target.value
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
                                    merchant_address: evt.target.value
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
                                    merchant_address_in_am: evt.target.value
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
                                    merchant_city: evt.target.value
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
                                    merchant_city_in_am: evt.target.value
                                })} />
                </div>
                <div className="add-term-data-fields">
                    <TextInput label={t("terminalsSection.merchantPhoneNumber")}
                                width="340px"
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchant_phone_number: evt.target.value
                                })} />
                    <TextInput label={t("terminalsSection.merchantWebPage")}
                                marginTop={"10px"}
                                width="340px"
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchant_web_page: evt.target.value
                                })} />
                    <TextInput label={t("terminalsSection.merchantEmail")}
                                marginTop={"10px"}
                                width="340px"
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchant_email: evt.target.value
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
                                            changeFieldName={"payment_system"}
                                            width={"223px"}
                                            marginTop={"10px"} />
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