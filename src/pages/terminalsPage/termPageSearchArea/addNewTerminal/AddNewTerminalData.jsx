import "./AddNewTerminalData.css";
import Button from "../../../../generalComponents/buttons/Button";
import TextInput from "../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../../generalComponents/inputFields/selectComponent/SelectComponent";
import AutoCompleteSelect from "../../../../generalComponents/inputFields/autoCompleteSelect/AutoCompleteSelect";
import ModalComponent from "../../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import SuccessAnimation from "../../../../generalComponents/successAnimation/SuccessAnimation";
import Loader from "../../../../generalComponents/loaders/Loader";
import { postDataApi } from "../../../../apis/postDataApi";
import { refreshTokenMakeCall } from "../../../../utils/helpers/refreshTokenMakeCall";
import { getFieldsArrayFromAllObjectsArray } from "../../../../utils/helpers/getFieldsArrayFromAllObjectsArray";
import { colors } from "../../../../assets/styles/colors";
import { useState } from "react";
import { urls } from "../../../../constants/urls/urls";
import { paths } from "../../../../constants/paths/paths";
import { editToken } from "../../../../redux/slices/authorization/authSlice";
import { useNavigate } from "react-router-dom";
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
    const [ emptyTaxError, setEmptyTaxError ] = useState(false);
    const [ invalidTaxError, setInvalidTaxError ] = useState(false);
    const [ emptyMerchantNameError, setEmptyMerchantNameError ] = useState(false);
    const [ longMerchantNameError, setLongMerchantNameError ] = useState(false);
    const [ emptyMerchantNameInAmError, setEmptyMerchantNameInAmError ] = useState(false);
    const [ longMerchantNameInAmError, setLongMerchantNameInAmError ] = useState(false);
    const [ emptyMerchantAddressError, setEmptyMerchantAddressError ] = useState(false);
    const [ longMerchantAddressError, setLongMerchantAddressError ] = useState(false);
    const [ emptyMerchantAddressInAmError, setEmptyMerchantAddressInAmError ] = useState(false);
    const [ longMerchantAddressInAmError, setLongMerchantAddressInAmError ] = useState(false);
    const [ emptyMerchantCityError, setEmptyMerchantCityError ] = useState(false);
    const [ terminalExistsError, setTerminalExistsError ] = useState(false);
    const [ showLoading, setShowLoading ] = useState(false);
    const [ openCloseSuccessModal, setOpenCloseSuccessModal ] = useState(false);
    const [ openCloseErrorModal, setOpenCloseErrorModal ] = useState(false);

    const navigate = useNavigate();
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
        setEmptyTaxError,
        setInvalidTaxError,
        setEmptyMerchantNameError,
        setLongMerchantNameError,
        setEmptyMerchantNameInAmError,
        setLongMerchantNameInAmError,
        setEmptyMerchantAddressError,
        setLongMerchantAddressError,
        setEmptyMerchantAddressInAmError,
        setLongMerchantAddressInAmError,
        setEmptyMerchantCityError,
        setTerminalExistsError
    ];

    const onClickAddButton = async () => {
        resetPrevValidations(terminalsErrorFields);

        if (!checkFieldsValidation(newTerminalData, terminalsErrorFields, {newTerminalData, mccs})) {
            const terminalDataForCall = {...newTerminalData};

            posModels.map((posModel) => {
                if (terminalDataForCall.posModel_id === posModel.name) {
                    terminalDataForCall.posModel_id = posModel.id;
                }
            });

            mccs.map((mcc) => {
                if (terminalDataForCall.mcc_id === mcc.code) {
                    terminalDataForCall.mcc_id = mcc.id;
                }
            })

            cities.map((city) => {
                if (terminalDataForCall.city_id === city.name_am) {
                    terminalDataForCall.city_id = city.id;
                }
            });

            setShowLoading(true);
            const response = await postDataApi(urls.ADD_NEW_TERMINAL_URL, terminalDataForCall);
            setShowLoading(false);

            if (response.status === 201) {
                setIsTermDataChanged(!isTermDataChanged);
                setOpenCloseSuccessModal(true);
                setTimeout(() => {
                    onCloseHandler();
                }, 3000);
            } else if (response.status === 409) {
                setTerminalExistsError(true);
            } else if (response.status === 401) {
                setShowLoading(true);
                const response = await refreshTokenMakeCall(
                    setShowLoading, 
                    [ postDataApi ], 
                    [urls.ADD_NEW_TERMINAL_URL],
                    true,
                    terminalDataForCall
                );
                setShowLoading(false);

                if (response.callsResponses.length) {
                    dispatch(editToken(response.responseRefreshToken.data.access_token));
                    localStorage.setItem("token", response.responseRefreshToken.data.access_token);

                    if (response.callsResponses[0].status === 201) {
                        setIsTermDataChanged(!isTermDataChanged);
                        setOpenCloseSuccessModal(true);
                        setTimeout(() => {
                            onCloseHandler();
                        }, 3000);
                    } else if (response.callsResponses[0].status === 409) {
                        setTerminalExistsError(true);
                    } else if (response.callsResponses[0].status === 401) {
                        localStorage.clear();
                        dispatch(editToken(""));
                
                        navigate(paths.LOGIN);
                    }
                } else {
                    localStorage.clear();
                    dispatch(editToken(""));
            
                    navigate(paths.LOGIN);
                }
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
                                    serial_number: (evt.target.value).trim()
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
                                    terminalId: (evt.target.value).trim()
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
                                    merchantId: (evt.target.value).trim()
                                })} />
                    <SelectComponent label={t("terminalsSection.posType")}
                                        chooseData={getFieldsArrayFromAllObjectsArray(posModels, "name")}
                                        width={"223px"}
                                        marginTop={"10px"}
                                        existsError={emptyPosTypeError}
                                        errorText={t("searchArea.emptyFieldError")}
                                        onChooseHandler={(evt) => {
                                            setNewTerminalData({
                                                ...newTerminalData,
                                                posModel_id: evt.target.value
                                            });
                                        }} />
                    <AutoCompleteSelect label={t("terminalsSection.mcc")}
                                        data={getFieldsArrayFromAllObjectsArray(mccs, "code")}
                                        width={"223px"}
                                        marginTop={"10px"}
                                        existsError={emptyMccError}
                                        errorText={t("searchArea.emptyFieldError")}
                                        onChangeHandler={(evt) => {
                                            setNewTerminalData({
                                                ...newTerminalData,
                                                mcc_id: evt.target.innerText
                                            });
                                        }} />
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
                                    merchantTin: (evt.target.value).trim()
                                })} />
                    <TextInput label={t("terminalsSection.merchantName")}
                                marginTop={"10px"}
                                width="340px"
                                existsError={emptyMerchantNameError || longMerchantNameError}
                                errorText={
                                    emptyMerchantNameError ? t("searchArea.emptyFieldError") :
                                    longMerchantNameError ? t("userSection.longFieldError") : null
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchantNameGlobal: (evt.target.value).trim()
                                })} />
                    <TextInput label={t("terminalsSection.merchantNameAm")}
                                marginTop={"10px"}
                                width="340px"
                                existsError={emptyMerchantNameInAmError || longMerchantNameInAmError}
                                errorText={
                                    emptyMerchantNameInAmError ? t("searchArea.emptyFieldError") :
                                    longMerchantNameInAmError ? t("userSection.longFieldError") : null
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchantNameLocal: (evt.target.value).trim()
                                })} />
                    <TextInput label={t("terminalsSection.merchantAddress")}
                                marginTop={"10px"}
                                width="340px"
                                existsError={emptyMerchantAddressError || longMerchantAddressError}
                                errorText={
                                    emptyMerchantAddressError ? t("searchArea.emptyFieldError") :
                                    longMerchantAddressError ? t("userSection.longFieldError") : null
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchantAddressGlobal: evt.target.value
                                })} />
                    <TextInput label={t("terminalsSection.merchantAddressAm")}
                                marginTop={"10px"}
                                width="340px"
                                existsError={emptyMerchantAddressInAmError || longMerchantAddressInAmError}
                                errorText={
                                    emptyMerchantAddressInAmError ? t("searchArea.emptyFieldError") :
                                    longMerchantAddressInAmError ? t("userSection.longFieldError") : null
                                }
                                onChangeHandler={(evt) => setNewTerminalData({
                                    ...newTerminalData,
                                    merchantAddressLocal: evt.target.value
                                })} />
                </div>
                <div className="add-term-data-fields">
                    <AutoCompleteSelect label={t("terminalsSection.merchantCity")}
                                        data={getFieldsArrayFromAllObjectsArray(cities, "name_am")}
                                        existsError={emptyMerchantCityError}
                                        errorText={t("searchArea.emptyFieldError")}
                                        width="340px"
                                        onChangeHandler={(evt) => {
                                            setNewTerminalData({
                                                ...newTerminalData,
                                                city_id: evt.target.innerText
                                            });
                                        }} />
                    <TextInput label={t("terminalsSection.merchantPhoneNumber")}
                                marginTop={"10px"}
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
                </div>
            </div>
            {terminalExistsError &&
                <p style={{ color: colors.loginFailedColor, marginLeft: "15px" }} 
                   className="add-term-data-terminal-exists-text"
                >
                    {t("terminalsSection.terminalAlreadyExists")}
                </p>
            }
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
            {showLoading &&
                <Loader />
            }
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