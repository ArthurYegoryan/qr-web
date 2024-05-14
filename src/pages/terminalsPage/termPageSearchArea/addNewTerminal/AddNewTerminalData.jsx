import "./AddNewTerminalData.css";
import { useState, useEffect } from "react";
import getTerminalsTypes from "../../../../api/getTerminalsTypes";
import getBanks from "../../../../api/getBanks";
import getPaymentSystems from "../../../../api/getPaymentSystems";
import addNewTerminal from "../../../../api/addNewTerminal";
import { urls } from "../../../../constants/urls/urls";
import { editToken, logoutUser } from "../../../../redux/slices/authorization/auth";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ModalComponent from "../../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import Button from "../../../../generalComponents/buttons/Button";
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
    const [ serialError, setSerialError ] = useState(false);
    const [ tidError, setTidError ] = useState(false);
    const [ midError, setMidError ] = useState(false);
    const [ posTypeError, setPosTypeError ] = useState(false);
    const [ mccError, setMccError ] = useState(false);
    const [ taxError, setTaxError ] = useState(false);
    const [ merchantNameError, setMerchantNameError ] = useState(false);
    const [ merchantNameInAmError, setMerchantNameInAmError ] = useState(false);
    const [ merchantAddressError, setMerchantAddressError ] = useState(false);
    const [ merchantAddressInAmError, setMerchantAddressInAmError ] = useState(false);
    const [ merchantCityError, setMerchantCityError ] = useState(false);
    const [ merchantCityInAmError, setMerchantCityInAmError ] = useState(false);
    const [ bankError, setBankError ] = useState(false);
    const [ paySysError, setPaySysError ] = useState(false);

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
                    dispatch(editToken(""));
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

        if (!serialValidation(serial)) {
            existsError = true;
            setSerialError(true);
        }
        if (!midTidValidation(tid)) {
            existsError = true;
            setTidError(true);
        }
        if (!midTidValidation(mid)) {
            existsError = true;
            setMidError(true);
        }
        if (!posType.length) {
            existsError = true;
            setPosTypeError(true);
        }
        if (!mccValidation(mcc)) {
            existsError = true;
            setMccError(true);
        }
        if (!taxValidation(tax)) {
            existsError = true;
            setTaxError(true);
        }
        if (!merchantName.length) {
            existsError = true;
            setMerchantNameError(true);
        }
        if (!merchantNameInAm.length) {
            existsError = true;
            setMerchantNameInAmError(true);
        }
        if (!merchantAddress.length) {
            existsError = true;
            setMerchantAddressError(true);
        }
        if (!merchantAddressInAm.length) {
            existsError = true;
            setMerchantAddressInAmError(true);
        }
        if (!merchantCity.length) {
            existsError = true;
            setMerchantCityError(true);
        }
        if (!merchantCityInAm.length) {
            console.log("Merchant city in am: ", merchantCityInAm);
            existsError = true;
            setMerchantCityInAmError(true);
        }
        if (!bank.length) {
            existsError = true;
            setBankError(true);
        }
        if (!paymentSystem.length) {
            existsError = true;
            setPaySysError(true);
        }

        return existsError;
    };

    const resetPrevValidations = () => {
        setSerialError(false);
        setTidError(false);
        setMidError(false);
        setMccError(false);
        setTaxError(false);
        setMerchantNameError(false);
        setMerchantNameInAmError(false);
        setMerchantAddressError(false);
        setMerchantAddressInAmError(false);
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
                dispatch(editToken(""));
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
                        <div className="add-term-data-field">
                            <label htmlFor="serial" className="add-term-data-label">Serial number</label> <br />
                            <input type="text" id="serial" name="serial"
                                onChange={(evt) => setNewTerminalData({...newTerminalData, serial: evt.target.value})} />
                            {serialError &&
                                <>
                                    <br />
                                    <small className="add-term-data-field-error-text">Serial length must be 8!</small>
                                </>                                
                            }
                        </div>
                        <div className="add-term-data-field">
                            <label htmlFor="tid" className="add-term-data-label">Terminal ID</label> <br />
                            <input type="text" id="tid" name="tid"
                                   onChange={(evt) => setNewTerminalData({...newTerminalData, tid: evt.target.value})} />
                            {tidError &&
                                <>
                                    <br />
                                    <small className="add-term-data-field-error-text">TID must contain at least 8 numbers and can't start with 0!</small>
                                </>                                
                            }
                        </div>
                        <div className="add-term-data-field">
                            <label htmlFor="mid" className="add-term-data-label">Merchant ID</label> <br />
                            <input type="text" id="mid" name="mid"
                                   onChange={(evt) => setNewTerminalData({...newTerminalData, mid: evt.target.value})} />
                            {midError &&
                                <>
                                    <br />
                                    <small className="add-term-data-field-error-text">MID must contain at least 8 numbers and can't start with 0!</small>
                                </>
                            }
                        </div>
                        <div className="add-term-data-field">
                            <label className="add-term-data-label">POS type</label> <br />
                            <select onChange={(evt) => setNewTerminalData({...newTerminalData, posType: evt.target.value})}>
                                <option selected disabled value="">{"-----"}</option>
                                {                                    
                                    terminalsTypes.map((terminalType) => {
                                        return (
                                            <option value={terminalType} key={Math.random()}>
                                                {terminalType}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            {posTypeError &&
                                <>
                                    <br />
                                    <small className="add-term-data-field-error-text">POS type can't be empty!</small>
                                </>
                            }
                        </div>
                        <div className="add-term-data-field">
                            <label htmlFor="mcc" className="add-term-data-label">MCC</label> <br />
                            <input type="text" id="mcc" name="mcc" 
                                onChange={(evt) => setNewTerminalData({...newTerminalData, mcc: evt.target.value})} />
                            {mccError &&
                                <>
                                    <br />
                                    <small className="add-term-data-field-error-text">MCC must contain 4 numbers!</small>
                                </>
                            }
                        </div>
                        <div className="add-term-data-field">
                            <label htmlFor="tax" className="add-term-data-label">TAX</label> <br />
                            <input type="text" id="tax" name="tax"
                                onChange={(evt) => setNewTerminalData({...newTerminalData, tax: evt.target.value})} />
                            {taxError &&
                                <>
                                    <br />
                                    <small className="add-term-data-field-error-text">TAX must contain 8 numbers!</small>
                                </>                                
                            }
                        </div>
                    </div>
                    <div className="add-term-data-fields">
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