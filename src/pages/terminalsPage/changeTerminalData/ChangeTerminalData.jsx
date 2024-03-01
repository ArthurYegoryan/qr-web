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

const ChangeTerminalData = ({ terminal, onCloseHandler }) => {
    console.log("Terminal: ", JSON.stringify(terminal, null, 2));

    const { role } = useSelector((state) => state.auth);

    const [ terminalsTypes, setTerminalsTypes ] = useState([]);
    const [ banks, setBanks ] = useState([]);
    const [ paymentSystems, setPaymentSystems ] = useState([]);
    const [ openCloseModal, setOpenCloseModal ] = useState(false);

    const [ serial, setSerial ] = useState(terminal.serial);
    const [ tid, setTid ] = useState(terminal.tid);
    const [ mid, setMid ] = useState(terminal.mid);
    const [ posType, setPosType ] = useState("");
    const [ mcc, setMcc ] = useState(terminal.mcc);
    const [ tax, setTax ] = useState(terminal.merchant_tax_number);
    const [ merchantName, setMerchantName ] = useState(terminal.merchant_name);
    const [ merchantNameInAm, setMerchantNameInAm ] = useState(terminal.merchant_name_in_am);
    const [ merchantAddress, setMerchantAddress ] = useState(terminal.merchant_address);
    const [ merchantAddressInAm, setMerchantAddressInAm ] = useState(terminal.merchant_address_in_am);
    const [ merchantCity, setMerchantCity ] = useState(terminal.merchant_address);
    const [ merchantCitysInAm, setMerchantCityInAm ] = useState(terminal.merchant_address_in_am);
    const [ merchantPhoneNumber, setMerchantPhoneNumber ] = useState(terminal.merchant_phone_number);
    const [ merchantWebPage, setMerchantWebPage ] = useState(terminal.merchant_web_page);
    const [ merchantEmail, setMerchantEmail ] = useState(terminal.merchant_email);
    const [ active, setActive ] = useState(terminal.active);
    const [ bank, setBank ] = useState("");
    const [ paymentSystem, setPaymentSystem ] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTerminalsTypes = async () => {
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

                } else if (responseTermTypes.message === "expired token" ||
                           responseBanks.message === "expired token" ||
                           responsePaySystems.message === "expired token") {
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
        fetchTerminalsTypes();
    }, []);

    const onClickSaveButton = async () => {
        const newTerminalData = {
            serial,
            tid,
            mid,
            posType,
            mcc,
            tax,
            merchantName,
            merchantNameInAm,
            merchantAddress,
            merchantAddressInAm,
            merchantCity,
            merchantCitysInAm,
            merchantPhoneNumber,
            merchantWebPage,
            merchantEmail,
            active,
            bank,
            paymentSystem
        };

        // const response = await changeTerminalData(urls.PUT_TERMINAL_DATA_URL, newTerminalData);

        console.log("New terminal data: ", JSON.stringify(newTerminalData, null, 2));

    };

    return (
        <>
            <div className="change-term-data-area">
                <div className="change-term-data-content">
                    <div className="change-term-data-fields">
                        <div className="change-term-data-field">
                            <label htmlFor="serial" className="change-term-data-label">*Serial number</label> <br />
                            <input type="text" id="serial" name="serial" defaultValue={terminal.serial} onChange={(evt) => setSerial(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="tid" className="change-term-data-label">Terminal ID</label> <br />
                            <input type="text" id="tid" name="tid" defaultValue={terminal.tid} onChange={(evt) => setTid(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="mid" className="change-term-data-label">Merchant ID</label> <br />
                            <input type="text" id="mid" name="mid" defaultValue={terminal.mid} onChange={(evt) => setMid(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label className="change-term-data-label">POS type</label> <br />
                            <select required>
                                <option disabled selected value="">-----</option>
                                {                                    
                                    terminalsTypes.map((terminalType) => {
                                        return (
                                            <option value={terminalType} onChange={(evt) => setPosType(evt.target.value)}>{terminalType}</option>
                                        )
                                    })
                                }
                            </select>                        
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="mcc" className="change-term-data-label">MCC</label> <br />
                            <input type="text" id="mcc" name="mcc" defaultValue={terminal.mcc} 
                                onChange={(evt) => setMcc(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="tax" className="change-term-data-label">MCC</label> <br />
                            <input type="text" id="tax" name="tax" defaultValue={terminal.merchant_tax_number} 
                                onChange={(evt) => setTax(evt.target.value)} />
                        </div>
                    </div>
                    <div className="change-term-data-fields">
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_name" className="change-term-data-label">Merchant name</label> <br />
                            <input type="text" id="merchant_name" name="merchant_name" defaultValue={terminal.merchant_name} 
                                onChange={(evt) => setMerchantName(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_name_in_am" className="change-term-data-label">Merchant name in am</label> <br />
                            <input type="text" id="merchant_name_in_am" name="merchant_name_in_am" 
                                defaultValue={terminal.merchant_name_in_am} onChange={(evt) => setMerchantNameInAm(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_address" className="change-term-data-label">Merchant address</label> <br />
                            <input type="text" id="merchant_address" name="merchant_address" defaultValue={terminal.merchant_address} 
                                onChange={(evt) => setMerchantAddress(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_address_in_am" className="change-term-data-label">Merchant address in am</label> <br />
                            <input type="text" id="merchant_address_in_am" name="merchant_address_in_am" 
                                defaultValue={terminal.merchant_address_in_am} onChange={(evt) => setMerchantAddressInAm(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_city" className="change-term-data-label">Merchant city</label> <br />
                            <input type="text" id="merchant_city" name="merchant_city" defaultValue={terminal.merchant_city} 
                                onChange={(evt) => setMerchantCity(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_city_in_am" className="change-term-data-label">Merchant city in am</label> <br />
                            <input type="text" id="merchant_city_in_am" name="merchant_city_in_am" 
                                defaultValue={terminal.merchant_city_in_am} onChange={(evt) => setMerchantCityInAm(evt.target.value)} />
                        </div>
                    </div>
                    <div className="change-term-data-fields">
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_phone_number" className="change-term-data-label">Merchant phone number</label> <br />
                            <input type="text" id="merchant_phone_number" name="merchant_phone_number" defaultValue={terminal.merchant_phone_number} 
                                onChange={(evt) => setMerchantPhoneNumber(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_web_page" className="change-term-data-label">Merchant web page</label> <br />
                            <input type="text" id="merchant_web_page" name="merchant_web_page" 
                                defaultValue={terminal.merchant_web_page} onChange={(evt) => setMerchantWebPage(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_email" className="change-term-data-label">Merchant email</label> <br />
                            <input type="text" id="merchant_email" name="merchant_email" defaultValue={terminal.merchant_email} 
                                onChange={(evt) => setMerchantEmail(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <input type="checkbox" id="active" name="v" defaultValue={terminal.active} 
                                onChange={(evt) => setActive(evt.target.checked)} />
                            <label htmlFor="active" className="change-term-data-activ-label">Is Active</label>
                        </div>
                        {role === "admin" &&
                            <>
                                <div className="change-term-data-field">
                                    <label className="change-term-data-label">Bank</label> <br />
                                    <select>
                                        <option disabled selected value="">-----</option>
                                        {
                                            banks.map((bank) => {
                                                return (
                                                    <option value={bank.short_name} onChange={(evt) => setBank(evt.target.value)}>
                                                        {bank.short_name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>                        
                                </div>
                                <div className="change-term-data-field">
                                    <label className="change-term-data-label">Pay sys</label> <br />
                                    <select>
                                        <option disabled selected value="">-----</option>
                                        {
                                            paymentSystems.map((paymentSystem) => {
                                                return (
                                                    <option value={paymentSystem.short_name} onChange={(evt) => setPaymentSystem(evt.target.value)}>
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
                    <Button label="Պահպանել" 
                            className="change-term-data-save-btn"
                            onClickHandler={() => onClickSaveButton()} 
                    />
                    <Button label="Չեղարկել" 
                            className="change-term-data-cancel-btn"
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