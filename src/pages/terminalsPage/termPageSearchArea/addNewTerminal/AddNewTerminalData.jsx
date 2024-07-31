import "./AddNewTerminalData.css";
import Button from "../../../../generalComponents/buttons/Button";
import TextInput from "../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../../generalComponents/inputFields/selectComponent/SelectComponent";
import ModalComponent from "../../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import SuccessAnimation from "../../../../generalComponents/successAnimation/SuccessAnimation";
import addNewTerminal from "../../../../testApis/addNewTerminal";
import { getFieldsArrayFromAllObjectsArray } from "../../../../utils/helpers/getFieldsArrayFromAllObjectsArray";
import { colors } from "../../../../assets/styles/colors";
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
    const posModels = useSelector((state) => state.posModels.posModels.payload);
    const mccs = useSelector((state) => state.mccs.mccs.payload);
    const cities = useSelector((state) => state.cities.cities.payload);
    const [ newTerminalData, setNewTerminalData ] = useState({
        serial_number: null,
        terminalId: null,
        merchantId: null,
        posModel_id: null,
        mcc_id: null,
        merchantTin: null,
        merchantNameGlobal: null,
        merchantNameLocal: null,
        merchantAddressGlobal: null,
        merchantAddressLocal: null,
        city_id: null,
        merchantPhoneNumber: null,
        merchantWebPage: null,
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
    // const [ emptyMerchantCityInAmError, setEmptyMerchantCityInAmError ] = useState(false);
    const [ openCloseSuccessModal, setOpenCloseSuccessModal ] = useState(false);
    const [ openCloseErrorModal, setOpenCloseErrorModal ] = useState(false);

    const dispatch = useDispatch();
    const { t } = useTranslation();

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
        // setEmptyMerchantCityInAmError,
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
                                    serial_number: evt.target.value
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
                                    terminalId: evt.target.value
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
                                    merchantId: evt.target.value
                                })} />
                    <SelectComponent label={t("terminalsSection.posType")}
                                        chooseData={getFieldsArrayFromAllObjectsArray(posModels, "name")}
                                        width={"223px"}
                                        marginTop={"10px"}
                                        existsError={emptyPosTypeError}
                                        errorText={t("searchArea.emptyFieldError")}
                                        onChooseHandler={(evt) => setNewTerminalData({
                                            ...newTerminalData,
                                            posModel_id: evt.target.value
                                        })} />
                    <TextInput label={t("terminalsSection.mcc")}
                                marginTop={"10px"}
                                existsError={emptyMccError || invalidMccError}
                                errorText={
                                    emptyMccError ? t("searchArea.emptyFieldError") :
                                    invalidMccError ? t("terminalsSection.invalidMcc") : null
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    mcc_id: evt.target.value
                                })} />                    
                </div>
                <div className="add-term-data-fields">
                    <TextInput label={t("terminalsSection.tax")}
                                width="340px"
                                existsError={emptyTaxError || invalidTaxError}
                                errorText={
                                    emptyTaxError ? t("searchArea.emptyFieldError") :
                                    invalidTaxError ? t("terminalsSection.invalidTax") : null
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchantTin: evt.target.value
                                })} />
                    <TextInput label={t("terminalsSection.merchantName")}
                                marginTop={"10px"}
                                width="340px"
                                existsError={emptyMerchantNameError}
                                errorText={
                                    emptyMerchantNameError && t("searchArea.emptyFieldError")
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchantNameGlobal: evt.target.value
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
                                    merchantNameLocal: evt.target.value
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
                                    merchantAddressGlobal: evt.target.value
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
                                    merchantAddressLocal: evt.target.value
                                })} />
                    {/* <TextInput label={t("terminalsSection.merchantCityAm")}
                                marginTop={"10px"}
                                width="340px"
                                existsError={emptyMerchantCityInAmError}
                                errorText={
                                    emptyMerchantCityInAmError && t("searchArea.emptyFieldError")
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchant_city_in_am: evt.target.value
                                })} /> */}
                </div>
                <div className="add-term-data-fields">
                    {/* <TextInput label={t("terminalsSection.merchantCity")}
                                width="340px"
                                existsError={emptyMerchantCityError}
                                errorText={
                                    emptyMerchantCityError && t("searchArea.emptyFieldError")
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    city_id: evt.target.value
                                })} /> */}
                    <SelectComponent label={t("terminalsSection.merchantCity")}
                                    chooseData={getFieldsArrayFromAllObjectsArray(cities, "name_am")}
                                    existsError={emptyMerchantCityError}
                                    errorText={t("searchArea.emptyFieldError")}
                                    onChangeHandler={(evt) => setNewTerminalData({
                                        ...newTerminalData,
                                        city_id: evt.target.value
                                    })} />
                    <TextInput label={t("terminalsSection.merchantPhoneNumber")}
                                marginTop={"10px"}
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
                    {/* <TextInput label={t("terminalsSection.merchantEmail")}
                                marginTop={"10px"}
                                width="340px"
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchant_email: evt.target.value
                                })} /> */}
                </div>
            </div>
            <div className="add-term-data-buttons">
                <Button label={t("addNewTerminal.addBtn")} 
                        marginRight="10px"
                        backgroundColor={colors.successBgColor}
                        hoverColor={colors.successHoverColor}
                        onClickHandler={() => onClickAddButton()} 
                />
                <Button label={t("addNewTerminal.cancelBtn")} 
                        backgroundColor={colors.cancelBgColor}
                        hoverColor={colors.cancelHoverColor}
                        onClickHandler={() => onCloseHandler()} 
                />
            </div>
            {openCloseSuccessModal &&
                <SuccessAnimation />
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