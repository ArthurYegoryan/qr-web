import "./ChangeTerminalData.css";
import { useState, useEffect } from "react";
import getTerminalsTypes from "../../../api/getTerminalsTypes";
import getBanks from "../../../api/getBanks";
import getPaymentSystems from "../../../api/getPaymentSystems";
import changeTerminalData from "../../../api/changeTerminalData";
import { urls } from "../../../constants/urls/urls";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { editToken, logoutUser } from "../../../redux/slices/authorization/auth";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import Button from "../../../generalComponents/buttons/Button";
import { serialValidation, midTidValidation, mccValidation, taxValidation } from "../../../utils/fieldsValidations/termDataFieldsValidation";
import { useTranslation } from 'react-i18next';

const ChangeTerminalData = ({ 
    terminal, 
    setIsTermDataChanged, 
    isTermDataChanged,
    onCloseHandler
}) => {
    const { role } = useSelector((state) => state.auth);

    const [ terminalsTypes, setTerminalsTypes ] = useState([]);
    const [ banks, setBanks ] = useState([]);
    const [ paymentSystems, setPaymentSystems ] = useState([]);
    const [ openCloseModal, setOpenCloseModal ] = useState(false);
    const [ terminalData, setTerminalData ] = useState({
        serial: terminal.serial,
        tid: terminal.tid,
        mid: terminal.mid,
        posType: terminal.pos_type,
        mcc: terminal.mcc,
        tax: terminal.merchant_tax_number,
        merchantName: terminal.merchant_name,
        merchantNameInAm: terminal.merchant_name_in_am,
        merchantAddress: terminal.merchant_address,
        merchantAddressInAm: terminal.merchant_address_in_am,
        merchantCity: terminal.merchant_city,
        merchantCitysInAm: terminal.merchant_city_in_am,
        merchantPhoneNumber: terminal.merchant_phone_number,
        merchantWebPage: terminal.merchant_web_page,
        merchantEmail: terminal.merchant_email,
        active: terminal.active,
        bank: terminal.bank,
        paymentSystem: "",
    });
    const [ serialError, setSerialError ] = useState(false);
    const [ tidError, setTidError ] = useState(false);
    const [ midError, setMidError ] = useState(false);
    const [ mccError, setMccError ] = useState(false);
    const [ taxError, setTaxError ] = useState(false);
    const [ merchantNameError, setMerchantNameError ] = useState(false);
    const [ merchantNameInAmError, setMerchantNameInAmError ] = useState(false);
    const [ merchantAddressError, setMerchantAddressError ] = useState(false);
    const [ merchantAddressInAmError, setMerchantAddressInAmError ] = useState(false);

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
                setOpenCloseModal(true);
            }
        }
        fetchTerminalsTypesBanksPaysys();
    }, []);

    const checkFieldsValidation = ({ serial, tid, mid, mcc, tax, merchantName, 
                                    merchantNameInAm, merchantAddress, merchantAddressInAm }) => {
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

    const onClickSaveButton = async () => {
        resetPrevValidations();

        if (!checkFieldsValidation(terminalData)) {
            const responseChangeTermData = await changeTerminalData(urls.PUT_TERMINAL_DATA_URL, terminalData);

            if (responseChangeTermData.message === "success") {
                setIsTermDataChanged(!isTermDataChanged);
                onCloseHandler();
            } else if (responseChangeTermData.message === "invalid token") {
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
            <div className="change-term-data-area">
                <div className="change-term-data-content">
                    <div className="change-term-data-fields">
                        <div className="change-term-data-field">
                            <label htmlFor="serial" className="change-term-data-label">*Serial number</label> <br />
                            <input type="text" id="serial" name="serial" defaultValue={terminal.serial} 
                                   onChange={(evt) => setTerminalData({...terminalData, serial: evt.target.value})} />
                            {serialError &&
                                <small className="change-term-data-field-error-text">Serial length must be 8!</small>
                            }
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="tid" className="change-term-data-label">Terminal ID</label> <br />
                            <input type="text" id="tid" name="tid" defaultValue={terminal.tid} 
                                   onChange={(evt) => setTerminalData({...terminalData, tid: evt.target.value})} />
                            {tidError &&
                                <small className="change-term-data-field-error-text">TID must contain only numbers!</small>
                            }
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="mid" className="change-term-data-label">Merchant ID</label> <br />
                            <input type="text" id="mid" name="mid" defaultValue={terminal.mid} 
                                   onChange={(evt) => setTerminalData({...terminalData, mid: evt.target.value})} />
                            {midError &&
                                <small className="change-term-data-field-error-text">MID must contain only numbers!</small>
                            }
                        </div>
                        <div className="change-term-data-field">
                            <label className="change-term-data-label">POS type</label> <br />
                            <select onChange={(evt) => setTerminalData({...terminalData, posType: evt.target.value})}>
                                <option selected value="">{terminal.pos_type}</option>
                                {                                    
                                    terminalsTypes.map((terminalType) => {
                                        return (
                                            <option value={terminalType}>
                                                {terminalType}
                                            </option>
                                        )
                                    })
                                }
                            </select>                        
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="mcc" className="change-term-data-label">MCC</label> <br />
                            <input type="text" id="mcc" name="mcc" defaultValue={terminal.mcc} 
                                onChange={(evt) => setTerminalData({...terminalData, mcc: evt.target.value})} />
                            {mccError &&
                                <small className="change-term-data-field-error-text">MCC must contain 4 numbers!</small>
                            }
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="tax" className="change-term-data-label">TAX</label> <br />
                            <input type="text" id="tax" name="tax" defaultValue={terminal.merchant_tax_number} 
                                onChange={(evt) => setTerminalData({...terminalData, tax: evt.target.value})} />
                            {taxError &&
                                <small className="change-term-data-field-error-text">TAX must contain 8 numbers!</small>
                            }
                        </div>
                    </div>
                    <div className="change-term-data-fields">
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_name" className="change-term-data-label">Merchant name</label> <br />
                            <input type="text" id="merchant_name" name="merchant_name" defaultValue={terminal.merchant_name} 
                                onChange={(evt) => setTerminalData({...terminalData, merchantName: evt.target.value})} />
                            {merchantNameError &&
                                <small className="change-term-data-field-error-text">Merchant name can't be empty!</small>
                            }
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_name_in_am" className="change-term-data-label">Merchant name in am</label> <br />
                            <input type="text" id="merchant_name_in_am" name="merchant_name_in_am" 
                                defaultValue={terminal.merchant_name_in_am} 
                                onChange={(evt) => setTerminalData({...terminalData, merchantNameInAm: evt.target.value})} />
                            {merchantNameInAmError &&
                                <small className="change-term-data-field-error-text">Merchant name in am can't be empty!</small>
                            }
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_address" className="change-term-data-label">Merchant address</label> <br />
                            <input type="text" id="merchant_address" name="merchant_address" defaultValue={terminal.merchant_address} 
                                onChange={(evt) => setTerminalData({...terminalData, merchantAddress: evt.target.value})} />
                            {merchantAddressError &&
                                <small className="change-term-data-field-error-text">Merchant address can't be empty!</small>
                            }
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_address_in_am" className="change-term-data-label">Merchant address in am</label> <br />
                            <input type="text" id="merchant_address_in_am" name="merchant_address_in_am" 
                                defaultValue={terminal.merchant_address_in_am} 
                                onChange={(evt) => setTerminalData({...terminalData, merchantAddressInAm: evt.target.value})} />
                            {merchantAddressInAmError &&
                                <small className="change-term-data-field-error-text">Merchant address in am can't be empty!</small>
                            }
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_city" className="change-term-data-label">Merchant city</label> <br />
                            <input type="text" id="merchant_city" name="merchant_city" defaultValue={terminal.merchant_city} 
                                onChange={(evt) => setTerminalData({...terminalData, merchantCity: evt.target.value})} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_city_in_am" className="change-term-data-label">Merchant city in am</label> <br />
                            <input type="text" id="merchant_city_in_am" name="merchant_city_in_am" 
                                defaultValue={terminal.merchant_city_in_am} 
                                onChange={(evt) => setTerminalData({...terminalData, merchantCitysInAm: evt.target.value})} />
                        </div>
                    </div>
                    <div className="change-term-data-fields">
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_phone_number" className="change-term-data-label">Merchant phone number</label> <br />
                            <input type="text" id="merchant_phone_number" name="merchant_phone_number" 
                            defaultValue={terminal.merchant_phone_number} 
                                onChange={(evt) => setTerminalData({...terminalData, merchantPhoneNumber: evt.target.value})} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_web_page" className="change-term-data-label">Merchant web page</label> <br />
                            <input type="text" id="merchant_web_page" name="merchant_web_page" 
                                defaultValue={terminal.merchant_web_page} 
                                onChange={(evt) => setTerminalData({...terminalData, merchantWebPage: evt.target.value})} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_email" className="change-term-data-label">Merchant email</label> <br />
                            <input type="text" id="merchant_email" name="merchant_email" defaultValue={terminal.merchant_email} 
                                onChange={(evt) => setTerminalData({...terminalData, merchantEmail: evt.target.value})} />
                        </div>
                        <div className="change-term-data-field">
                            <input type="checkbox" id="active" defaultChecked={terminal.active}
                                onChange={(evt) => setTerminalData({...terminalData, active: evt.target.checked})} />
                            <label htmlFor="active" className="change-term-data-activ-label">Is Active</label>
                        </div>
                        {role === "admin" &&
                            <>
                                <div className="change-term-data-field">
                                    <label className="change-term-data-label">Bank</label> <br />
                                    <select onChange={(evt) => {
                                        console.log(evt.target.value);
                                        setTerminalData({...terminalData, bank: evt.target.value})
                                    }}>
                                        <option>{terminal.bank}</option>
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
                                </div>
                                <div className="change-term-data-field">
                                    <label className="change-term-data-label">Pay sys</label> <br />
                                    <select onChange={(evt) => setTerminalData({...terminalData, paymentSystem: evt.target.value})}>
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
                                </div>
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
            {openCloseModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseModal(false)}
                                isOpen={true}
                                title="Connection failed!"
                                body={<ErrorModalBody />}
                                bgcolor="red" />
            }
        </>
    );
};

export default ChangeTerminalData;