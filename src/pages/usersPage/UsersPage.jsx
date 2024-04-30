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
import UsersTable from "./usersTable/UsersTable";

const UsersPage = () => {
    const [ users, setUsers ] = useState([]);
    const [ openCloseModal, setOpenCloseModal ] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        try {
            const getUsersBanksData = async () => {
                const responseBanks = await getBanks(urls.GET_BANKS_URL);
                const responseUsers = await getUsers(urls.GET_USERS_URL);

                const banks = {};

                if (responseBanks.message === "success" && responseUsers.message === "success") {
                    responseBanks.banks.map((bank) => {
                        banks[bank.id] = bank.short_name;
                    });

                    responseUsers.users.map((user) => {
                        if (user.bank !== "FPS") {
                            user.bank = banks[user.bank];
                        }
                    });

                    setUsers(responseUsers.users);
                } else if (responseBanks.message === "expired token" || responseUsers.message === "expired token") {
                    localStorage.clear();
                    dispatch(editToken(""));
                    dispatch(logoutUser());
            
                    <Navigate to="/login" />;
                } else {
                    throw new Error("Connection error!");
                }                
            }
            getUsersBanksData();
        } catch(err) {
            setOpenCloseModal(true);
        }
    }, []);

    return (
        <div className="users-page-area">
            <h1>
                Users page
            </h1>
            <div className="users-table-div">
                <UsersTable users={users} />
            </div>            
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