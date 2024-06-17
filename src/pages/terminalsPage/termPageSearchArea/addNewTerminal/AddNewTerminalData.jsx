import "./AddNewTerminalData.css";
import Button from "../../../../generalComponents/buttons/Button";
import TextInput from "../../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../../generalComponents/inputFields/selectComponent/SelectComponent";
import CheckBoxLabels from "../../../../generalComponents/inputFields/checkbox/CheckBoxComponent";
import ModalComponent from "../../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import getTerminalsTypes from "../../../../api/getTerminalsTypes";
import getBanks from "../../../../api/getAllBanks";
import getPaymentSystems from "../../../../api/getPaymentSystems";
import addNewTerminal from "../../../../api/addNewTerminal";
import { useState, useEffect } from "react";
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

    const [ terminalsTypes, setTerminalsTypes ] = useState([]);
    const [ banks, setBanks ] = useState([]);
    const [ paymentSystems, setPaymentSystems ] = useState([]);
    const [ openCloseErrorModal, setOpenCloseErrorModal ] = useState(false);
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

    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchTerminalsTypesBanksPaysys = async () => {
            try {
                const responseTermTypes = await getTerminalsTypes(urls.GET_TERMINALS_TYPES_URL);
                const responseBanks = await getBanks(urls.GET_BANKS_URL);
                const responsePaySystems = await getPaymentSystems(urls.GET_PAYMENT_SYSTEMS_URL);

                if (responseTermTypes.message === "success" &&
                    responseBanks.message === "success" &&
                    responsePaySystems.message === "success") {
                    
                    setTerminalsTypes(responseTermTypes.terminalsTypes);
                    setBanks(responseBanks.banks);
                    setPaymentSystems(responsePaySystems.paymentSystems);

                } else if (responseTermTypes.message === "invalid token" ||
                           responseBanks.message === "invalid token" ||
                           responsePaySystems.message === "invalid token") {
                    localStorage.clear();
                    dispatch(logoutUser());
            
                    <Navigate to="/login" />;
                } else {
                    throw Error("Terminals data error!");
                }
            } catch(err) {
                setOpenCloseErrorModal(true);
            }
        }
        fetchTerminalsTypesBanksPaysys();
    }, []);

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
                onCloseHandler();
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
        <>
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
                                         chooseData={terminalsTypes}
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
                    {/*<div className="add-term-data-fields">
                        <div className="add-term-data-field">
                            <label htmlFor="merchant_name" className="add-term-data-label">Merchant name</label> <br />
                            <input type="text" id="merchant_name" name="merchant_name" 
                                onChange={(evt) => setNewTerminalData({...newTerminalData, merchantName: evt.target.value})} />
                            {merchantNameError &&
                                <>
                                    <br />
                                    <small className="add-term-data-field-error-text">Merchant name can't be empty!</small>
                                </>                                
                            }
                        </div>
                        <div className="add-term-data-field">
                            <label htmlFor="merchant_name_in_am" className="add-term-data-label">Merchant name in am</label> <br />
                            <input type="text" id="merchant_name_in_am" name="merchant_name_in_am" 
                                onChange={(evt) => setNewTerminalData({...newTerminalData, merchantNameInAm: evt.target.value})} />
                            {merchantNameInAmError &&
                                <>
                                    <br />
                                    <small className="add-term-data-field-error-text">Merchant name in am can't be empty!</small>
                                </>                                
                            }
                        </div>
                        <div className="add-term-data-field">
                            <label htmlFor="merchant_address" className="add-term-data-label">Merchant address</label> <br />
                            <input type="text" id="merchant_address" name="merchant_address"
                                onChange={(evt) => setNewTerminalData({...newTerminalData, merchantAddress: evt.target.value})} />
                            {merchantAddressError &&
                                <>
                                    <br />
                                    <small className="add-term-data-field-error-text">Merchant address can't be empty!</small>
                                </>                                
                            }
                        </div>
                        <div className="add-term-data-field">
                            <label htmlFor="merchant_address_in_am" className="add-term-data-label">Merchant address in am</label> <br />
                            <input type="text" id="merchant_address_in_am" name="merchant_address_in_am" 
                                onChange={(evt) => setNewTerminalData({...newTerminalData, merchantAddressInAm: evt.target.value})} />
                            {merchantAddressInAmError &&
                                <>
                                    <br />
                                    <small className="add-term-data-field-error-text">Merchant address in am can't be empty!</small>
                                </>                                
                            }
                        </div>
                        <div className="add-term-data-field">
                            <label htmlFor="merchant_city" className="add-term-data-label">Merchant city</label> <br />
                            <input type="text" id="merchant_city" name="merchant_city"
                                onChange={(evt) => setNewTerminalData({...newTerminalData, merchantCity: evt.target.value})} />
                            {merchantCityError &&
                                <>
                                    <br />
                                    <small className="add-term-data-field-error-text">Merchant city can't be empty!</small>
                                </>                                
                            }
                        </div>
                        <div className="add-term-data-field">
                            <label htmlFor="merchant_city_in_am" className="add-term-data-label">Merchant city in am</label> <br />
                            <input type="text" id="merchant_city_in_am" name="merchant_city_in_am" 
                                onChange={(evt) => setNewTerminalData({...newTerminalData, merchantCityInAm: evt.target.value})} />
                            {merchantCityInAmError &&
                                <>
                                    <br />
                                    <small className="add-term-data-field-error-text">Merchant city in am can't be empty!</small>
                                </>                                
                            }
                        </div>
                    </div>
                    <div className="add-term-data-fields">
                        <div className="add-term-data-field">
                            <label htmlFor="merchant_phone_number" className="add-term-data-label">Merchant phone number</label> <br />
                            <input type="text" id="merchant_phone_number" name="merchant_phone_number" 
                                onChange={(evt) => setNewTerminalData({...newTerminalData, merchantPhoneNumber: evt.target.value})} />
                        </div>
                        <div className="add-term-data-field">
                            <label htmlFor="merchant_web_page" className="add-term-data-label">Merchant web page</label> <br />
                            <input type="text" id="merchant_web_page" name="merchant_web_page" 
                                onChange={(evt) => setNewTerminalData({...newTerminalData, merchantWebPage: evt.target.value})} />
                        </div>
                        <div className="add-term-data-field">
                            <label htmlFor="merchant_email" className="add-term-data-label">Merchant email</label> <br />
                            <input type="text" id="merchant_email" name="merchant_email"
                                onChange={(evt) => setNewTerminalData({...newTerminalData, merchantEmail: evt.target.value})} />
                        </div>
                        {role === "admin" &&
                            <>
                                <div className="add-term-data-field">
                                    <label className="add-term-data-label">Bank</label> <br />
                                    <select onChange={(evt) => {
                                        setNewTerminalData({...newTerminalData, bank: evt.target.value})
                                    }}>
                                        <option selected disabled value="">{"-----"}</option>
                                        {
                                            banks.map((bank) => {
                                                return (
                                                    <option value={bank.full_name_en.split(" ")[0]}>
                                                        {bank.full_name_en.split(" ")[0]}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                    {bankError &&
                                        <>
                                            <br />
                                            <small className="add-term-data-field-error-text">Bank can't be empty!</small>
                                        </>
                                    }
                                </div>
                                <div className="add-term-data-field">
                                    <label className="add-term-data-label">Pay sys</label> <br />
                                    <select onChange={(evt) => setNewTerminalData({...newTerminalData, paymentSystem: evt.target.value})}>
                                        <option disabled selected value="">-----</option>
                                        {
                                            paymentSystems.map((paymentSystem) => {
                                                return (
                                                    <option value={paymentSystem.short_name}>
                                                        {paymentSystem.short_name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>  
                                    {paySysError &&
                                        <>
                                            <br />
                                            <small className="add-term-data-field-error-text">Payment system can't be empty!</small>
                                        </>
                                    }                      
                                </div>
                            </>
                        } 
                    </div>*/}
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