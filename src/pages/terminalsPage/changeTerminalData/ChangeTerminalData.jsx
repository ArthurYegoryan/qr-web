import "./ChangeTerminalData.css";
import { useState, useEffect } from "react";
import getTerminalsTypes from "../../../api/getTerminalsTypes";
import { urls } from "../../../constants/urls/urls";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { editToken, logoutUser } from "../../../redux/slices/authorization/auth";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";

const ChangeTerminalData = ({ terminal }) => {
    console.log("Terminal: ", JSON.stringify(terminal, null, 2));

    const { role } = useSelector((state) => state.auth);

    const [ terminalsTypes, setTerminalsTypes ] = useState([]);
    const [ openCloseModal, setOpenCloseModal ] = useState(false);

    const [ serial, setSerial ] = useState(terminal.serial);
    const [ tid, setTid ] = useState(terminal.tid);
    const [ mid, setMid ] = useState(terminal.mid);
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

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTerminalsTypes = async () => {
            try {
                const response = await getTerminalsTypes(urls.GET_TERMINALS_TYPES_URL);

                if (response.message === "success") {
                    setTerminalsTypes(response.terminalsTypes);
                } else if (response.message === "expired token") {
                    localStorage.clear();
                    dispatch(editToken(""));
                    dispatch(logoutUser());
            
                    <Navigate to="/login" />;
                } else {
                    throw Error("Terminals types error!");
                }
            } catch(err) {
                console.log("Barlus Hayer");
                setOpenCloseModal(true);
            }            
        }
        fetchTerminalsTypes();
    }, []);

    return (
        <>
            <div className="change-term-data-area">
                <div className="change-term-data-content">
                    <div className="change-term-data-fields">
                        <div className="change-term-data-field">
                            <label htmlFor="serial" className="change-term-data-label">*Serial number</label> <br />
                            <input type="text" id="serial" name="serial" value={terminal.serial} onChange={(evt) => setSerial(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="tid" className="change-term-data-label">Terminal ID</label> <br />
                            <input type="text" id="tid" name="tid" value={terminal.tid} onChange={(evt) => setTid(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="mid" className="change-term-data-label">Merchant ID</label> <br />
                            <input type="text" id="mid" name="mid" value={terminal.mid} onChange={(evt) => setMid(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label className="change-term-data-label">POS type</label> <br />
                            <select>
                                {
                                    terminalsTypes.map((terminalType) => {
                                        return (
                                            <option value={terminalType}>{terminalType}</option>
                                        )
                                    })
                                }
                            </select>                        
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="mcc" className="change-term-data-label">MCC</label> <br />
                            <input type="text" id="mcc" name="mcc" value={terminal.mcc} onChange={(evt) => setMcc(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="tax" className="change-term-data-label">MCC</label> <br />
                            <input type="text" id="tax" name="tax" value={terminal.merchant_tax_number} onChange={(evt) => setTax(evt.target.value)} />
                        </div>
                    </div>
                    <div className="change-term-data-fields">
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_name" className="change-term-data-label">Merchant name</label> <br />
                            <input type="text" id="merchant_name" name="merchant_name" value={terminal.merchant_name} 
                                onChange={(evt) => setMerchantName(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_name_in_am" className="change-term-data-label">Merchant name in am</label> <br />
                            <input type="text" id="merchant_name_in_am" name="merchant_name_in_am" 
                                value={terminal.merchant_name_in_am} onChange={(evt) => setMerchantNameInAm(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_address" className="change-term-data-label">Merchant address</label> <br />
                            <input type="text" id="merchant_address" name="merchant_address" value={terminal.merchant_address} 
                                onChange={(evt) => setMerchantAddress(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_address_in_am" className="change-term-data-label">Merchant address in am</label> <br />
                            <input type="text" id="merchant_address_in_am" name="merchant_address_in_am" 
                                value={terminal.merchant_address_in_am} onChange={(evt) => setMerchantAddressInAm(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_city" className="change-term-data-label">Merchant city</label> <br />
                            <input type="text" id="merchant_city" name="merchant_city" value={terminal.merchant_city} 
                                onChange={(evt) => setMerchantCity(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_city_in_am" className="change-term-data-label">Merchant city in am</label> <br />
                            <input type="text" id="merchant_city_in_am" name="merchant_city_in_am" 
                                value={terminal.merchant_city_in_am} onChange={(evt) => setMerchantCityInAm(evt.target.value)} />
                        </div>
                    </div>
                    <div className="change-term-data-fields">
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_phone_number" className="change-term-data-label">Merchant phone number</label> <br />
                            <input type="text" id="merchant_phone_number" name="merchant_phone_number" value={terminal.merchant_phone_number} 
                                onChange={(evt) => setMerchantPhoneNumber(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_web_page" className="change-term-data-label">Merchant web page</label> <br />
                            <input type="text" id="merchant_web_page" name="merchant_web_page" 
                                value={terminal.merchant_web_page} onChange={(evt) => setMerchantWebPage(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <label htmlFor="merchant_email" className="change-term-data-label">Merchant email</label> <br />
                            <input type="text" id="merchant_email" name="merchant_email" value={terminal.merchant_email} 
                                onChange={(evt) => setMerchantEmail(evt.target.value)} />
                        </div>
                        <div className="change-term-data-field">
                            <input type="checkbox" id="active" name="v" value={terminal.active} 
                                onChange={(evt) => setActive(evt.target.checked)} />
                            <label htmlFor="active" className="change-term-data-activ-label">Is Active</label>
                        </div>
                        {role &&
                            <div>

                            </div>
                        }
                    </div>
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