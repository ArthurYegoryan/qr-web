import "./UsersPage.css";
import { useState, useEffect } from "react";
import getUsers from "../../api/getUsers";
import getBanks from "../../api/getBanks";
import { urls } from "../../constants/urls/urls";
import { useDispatch } from "react-redux";
import { editToken, logoutUser } from "../../redux/slices/authorization/auth";
import { Navigate } from "react-router-dom";
import ModalComponent from "../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";

const UsersPage = () => {
    const [ users, setUsers ] = useState([]);
    const [ banks, setBanks ] = useState([]);
    const [ openCloseModal, setOpenCloseModal ] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        try {
            const getUsersData = async () => {
                const response = await getUsers(urls.GET_USERS_URL);

                if (response.message === "success") {
                    setUsers(response.users);
                } else if (response.message === "expired token") {
                    localStorage.clear();
                    dispatch(editToken(""));
                    dispatch(logoutUser());
            
                    <Navigate to="/login" />;
                } else {
                    throw new Error("Connection error!");
                }                
            }
            getUsersData();
        } catch(err) {
            setOpenCloseModal(true);
        }
    }, []);

    useEffect(() => {
        try {
            const getBanksData = async () => {
                const response = await getBanks(urls.GET_BANKS_URL);

                if (response.message === "success") {
                    setBanks(response.banks);
                } else if (response.message === "expired token") {
                    localStorage.clear();
                    dispatch(editToken(""));
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

    return (
        <div className="users-page-area">
            <h1>
                Users page
            </h1>
            {openCloseModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseModal(false)} 
                                isOpen={openCloseModal} 
                                title="Connection error!"
                                body={<ErrorModalBody />}
                                bgcolor="red"
                />
            }
        </div>
    );
};

export default UsersPage;