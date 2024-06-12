import "./ChangeUserData.css";
import { useState, useEffect } from "react";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import getAllBanks from "../../../api/getAllBanks";
import changeUserData from "../../../api/changeUserData";
import { urls } from "../../../constants/urls/urls";
import { useDispatch } from "react-redux"
import { logoutUser } from "../../../redux/slices/authorization/authSlice";
import { Navigate } from "react-router-dom";
import Button from "../../../generalComponents/buttons/Button";
import { useTranslation } from 'react-i18next';
import { emailValidation } from "../../../utils/fieldsValidations/userDataFieldsValidation";

const ChangeUserData = ({
    user,
    setIsUserDataChanged,
    isUserDataChanged,
    onCloseHandler
}) => {
    const [ openCloseModal, setOpenCloseModal ] = useState(false);
    const [ banks, setBanks ] = useState([]);
    const [ userData, setUserData ] = useState({
        id: user.id,
        username: user.username,
        bank: user.bank,
        email: user.email,
        role: user.role,
    });
    const [ usernameError, setUsernameError ] = useState(false);
    const [ emailError, setEmailError ] = useState(false);

    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        try {
            const getBanksData = async () => {
                const response = await getAllBanks(urls.GET_BANKS_URL);

                if (response.message === "success") {
                    setBanks(response.banks);
                } else if (response.message === "expired token") {
                    localStorage.clear();
                    dispatch(logoutUser());
            
                    <Navigate to="/login" />;
                } else {
                    throw new Error("Connection error!");
                }                
            }
            getBanksData();
        } catch(err) {
            setOpenCloseModal(true);
        }
    }, []);

    const checkFieldsValidation = ({ username, email }) => {
        let existsError = false;

        if (username.length < 3) {
            existsError = true;
            setUsernameError(true);
        }
        if (!emailValidation(email)) {
            existsError = true;
            setEmailError(true);
        }

        return existsError;
    };

    const resetPrevValidations = () => {
        setUsernameError(false);
        setEmailError(false);
    };

    const onClickSaveButton = async () => {
        resetPrevValidations();

        if (!checkFieldsValidation(userData)) {
            if (user.username === userData.username &&
                user.bank === userData.bank &&
                user.email === userData.email) {
                
                onCloseHandler();
            } else {
                const responseChangeUserData = await changeUserData(urls.PUT_USER_DATA_URL, userData);

                if (responseChangeUserData.message === "success") {
                    console.log("Chishta")
                    setIsUserDataChanged(!isUserDataChanged);
                    onCloseHandler();
                } else if (responseChangeUserData.message === "invalid token") {
                    localStorage.clear();
                    dispatch(logoutUser());

                    <Navigate to="/login" />;
                } else {
                    throw Error("Connection error!");
                }
            }            
        }
    };

    return (
        <>
            <div className="change-user-data-area">
                <div className="change-user-data-content">
                    <div className="change-user-data-field">
                        <div className="change-user-data-field">
                            <label htmlFor="username" className="change-user-data-label">Username</label> <br />
                            <input type="text" id="username" name="username" defaultValue={user.username} 
                                   onChange={(evt) => setUserData({...userData, username: evt.target.value})} />
                            {usernameError &&
                                <small className="change-user-data-field-error-text">Username length must be at least 3!</small>
                            }
                        </div>
                    </div>
                    <div className="change-user-data-field">
                        <label className="change-user-data-label">Bank</label> <br />
                        <select onChange={(evt) => setUserData({...userData, bank: evt.target.value})}>
                            <option selected value="">{user.bank}</option>
                            {                                    
                                banks.map((bank) => {
                                    return (
                                        <option value={bank.short_name}>
                                            {bank.short_name}
                                        </option>
                                    )
                                })
                            }
                        </select>                        
                    </div>
                    <div className="change-user-data-field">
                        <label htmlFor="email" className="change-user-data-label">Email</label> <br />
                        <input type="text" id="email" name="email" defaultValue={user.email} 
                                onChange={(evt) => setUserData({...userData, email: evt.target.value})} /> <br />
                        {emailError &&
                            <small className="change-user-data-field-error-text">Email is not with valid format!</small>
                        }
                    </div>
                </div>
                <div className="change-user-data-buttons">
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

export default ChangeUserData;