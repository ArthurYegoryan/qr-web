import "./AddNewUser.css"
import Button from "../../../../generalComponents/buttons/Button";
import getBanks from "../../../../api/getBanks";
import getRoles from "../../../../api/getRoles";
import addNewUser from "../../../../api/addNewUser";
import { urls } from "../../../../constants/urls/urls";
import { emailValidation } from "../../../../utils/fieldsValidations/userDataFieldsValidation";
import ModalComponent from "../../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { editToken, logoutUser } from "../../../../redux/slices/authorization/auth";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const AddNewUser = ({
    setIsUserDataChanged, 
    isUserDataChanged,
    onCloseHandler
}) => {
    const [ newUserData, setNewUserData ] = useState({
        username: "",
        bank: "",
        email: "",
        password: "",
        role: ""
    });
    const [ openCloseErrorModal, setOpenCloseErrorModal ] = useState(false);
    const [ banks, setBanks ] = useState([]);
    const [ roles, setRoles ] = useState([]);
    const [ usernameError, setUsernameError ] = useState(false);
    const [ bankError, setBankError ] = useState(false);
    const [ emailError, setEmailError ] = useState(false);
    const [ passwordError, setPasswordError ] = useState(false);
    const [ roleError, setRoleError ] = useState(false);
    const [ isPassVisible, setIsPassVisible ] = useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchBanksRoles = async () => {
            try {
                const responseBanks = await getBanks(urls.GET_BANKS_URL);
                const responseRoles = await getRoles(urls.GET_ROLES_URL);

                if (responseBanks.message === "success" &&
                    responseRoles.message === "success") {
                    setBanks(responseBanks.banks);
                    setRoles(responseRoles.roles)
                } else if (responseBanks.message === "invalid token" ||
                           responseRoles.message === "invalid token") {
                    localStorage.clear();
                    dispatch(editToken(""));
                    dispatch(logoutUser());
            
                    <Navigate to="/login" />;
                } else {
                    throw Error("Users data error!");
                }
            } catch(err) {
                setOpenCloseErrorModal(true);
            }
        }
        fetchBanksRoles();
    }, []);

    const checkFieldsValidation = ({ username, bank, email, role, password }) => {
        let existsError = false;

        if (username.length < 3) {
            existsError = true;
            setUsernameError(true);
        }
        if (!bank.length) {
            existsError = true;
            setBankError(true);
        }
        if (!emailValidation(email)) {
            existsError = true;
            setEmailError(true);
        }
        if (!role.length) {
            existsError = true;
            setRoleError(true);
        }
        if (password.length < 8) {
            existsError = true;
            setPasswordError(true);
        }

        return existsError;
    };

    const resetPrevValidations = () => {
        setUsernameError(false);
        setBankError(false);
        setEmailError(false);
        setRoleError(false);
    };

    const onClickAddButton = async () => {
        resetPrevValidations();

        if (!checkFieldsValidation(newUserData)) {
            const responseAddNewUser = await addNewUser(urls.POST_NEW_USER_URL, newUserData);

            if (responseAddNewUser.message === "success") {
                setIsUserDataChanged(!isUserDataChanged);
                onCloseHandler();
            } else if (responseAddNewUser.message === "invalid token") {
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
            <div className="add-user-data-area">
                <div className="add-user-data-content">
                    <div className="add-user-data-fields">
                        <div className="add-user-data-field">
                            <label htmlFor="username" className="add-user-data-label">Username</label> <br />
                            <input type="text" id="username" name="username"
                                onChange={(evt) => setNewUserData({...newUserData, username: evt.target.value})} />
                            {usernameError &&
                                <>
                                    <br />
                                    <small className="add-user-data-field-error-text">Username length must be at least 3!</small>
                                </>                                
                            }
                        </div>
                        <div className="add-user-data-field">
                            <label className="add-user-data-label">Bank</label> <br />
                            <select onChange={(evt) => {
                                setNewUserData({...newUserData, bank: evt.target.value})
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
                                    <small className="add-user-data-field-error-text">Bank can't be empty!</small>
                                </>
                            }
                        </div>
                        <div className="add-user-data-field">
                            <label htmlFor="email" className="add-user-data-label">Email</label> <br />
                            <input type="text" id="email" name="email"
                                onChange={(evt) => setNewUserData({...newUserData, email: evt.target.value})} />
                            {emailError &&
                                <>
                                    <br />
                                    <small className="add-user-data-field-error-text">Invalid email!</small>
                                </>                                
                            }
                        </div>
                        <div className="add-user-data-field">
                            <label className="add-user-data-label">Role</label> <br />
                            <select onChange={(evt) => {
                                setNewUserData({...newUserData, role: evt.target.value})
                            }}>
                                <option selected disabled value="">{"-----"}</option>
                                {
                                    roles.map((role) => {
                                        return (
                                            <option value={role}>
                                                {role}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            {roleError &&
                                <>
                                    <br />
                                    <small className="add-user-data-field-error-text">Role can't be empty!</small>
                                </>
                            }
                        </div>
                        <div className="add-user-data-field">
                            <label htmlFor="password" className="add-user-data-label">Password</label> <br />
                            <div className="add-user-data-password">
                                <input type={!isPassVisible ? "password" : "text"} id="password" name="password"
                                    onChange={(evt) => setNewUserData({...newUserData, password: evt.target.value})} />
                                <span onClick={() => setIsPassVisible(!isPassVisible)}>
                                    {!isPassVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </span>
                            </div>
                            {passwordError &&
                                <small className="add-user-data-field-error-text">Password length must be at least 8!</small>                              
                            }
                        </div>
                    </div>
                </div>
                <div className="add-user-data-buttons">
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

export default AddNewUser;