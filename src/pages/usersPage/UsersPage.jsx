import "./UsersPage.css";
import { useState, useEffect } from "react";
import getUsersByPage from "../../api/getUsersByPage";
import getBanks from "../../api/getBanks";
import { urls } from "../../constants/urls/urls";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authorization/authSlice";
import { saveBanks, saveBanksAllData } from "../../redux/slices/banks/banksSlice";
import { Navigate } from "react-router-dom";
import ModalComponent from "../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import PaginationComponent from "../../generalComponents/pagination/Pagination";
import UsersSearchArea from "./usersSearchArea/UsersSearchArea";
import { usersTableFields } from "../../constants/tableFields/usersTableFields";
import Table from "../../generalComponents/table/Table";
import ChangeUserData from "./changeUserData/ChangeUserData";
import DeleteUserData from "./deleteUserData/DeleteUserData";
import { useTranslation } from 'react-i18next';

const UsersPage = () => {
    const [ users, setUsers ] = useState([]);
    const { banks } = useSelector((state) => state.banks);
    const [ usersPageCount, setUsersPageCount ] = useState(1);
    const [ usersSearchInfo, setUsersSearchInfo ] = useState({
        searchField: "",
        searchValue: ""
    });
    const [ usersPage, setUsersPage ] = useState(1);
    const [ isUserDataChanged, setIsUserDataChanged ] = useState(false);
    const [ isUserDataDeleted, setIsUserDataDeleted ] = useState(false);
    const [ isUserDataSearched, setIsUserDataSearched ] = useState(false);
    const [ selectedUser, setSelectedUser ] = useState({});
    const [ openCloseModal, setOpenCloseModal ] = useState(false);
    const [ openCloseEditModal, setOpenCloseEditModal ] = useState(false);
    const [ openCloseDeleteModal, setOpenCloseDeleteModal ] = useState(false);
    const { isMenuOpen } = useSelector((state) => state.menu);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const searchFields = [];
    usersTableFields.map(field => {
        if (field.name !== "#") {
            searchFields.push(field.name);
        }        
    });

    let paginationLeftMarginClassname = "";
    if (isMenuOpen) paginationLeftMarginClassname = "-open-menu";
    else paginationLeftMarginClassname = "-close-menu";

    useEffect(() => {
        try {
            const getBanksData = async () => {
                const responseBanks = await getBanks(urls.GET_BANKS_URL);
                
                if (responseBanks.message === "success") {
                    dispatch(saveBanksAllData(responseBanks.banks));

                    const banks = {};

                    responseBanks.banks.map((bank) => {
                        banks[bank.id] = bank.short_name;
                    });

                    dispatch(saveBanks(banks));
                } else if (responseBanks.message === "expired token") {
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

    useEffect(() => {
        try {
            const getUsersData = async () => {
                const responseUsers = await getUsersByPage(
                    urls.GET_USERS_URL,
                    {
                        page: usersPage,
                        searchParams: usersSearchInfo 
                    }
                );

                if (responseUsers.message === "success") {
                    setUsers(responseUsers.users);
                    setUsersPageCount(responseUsers.users_page_count);
                } else if (responseUsers.message === "expired token") {
                    localStorage.clear();
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
    }, [isUserDataChanged, isUserDataDeleted, usersPage, isUserDataSearched]);

    return (
        <div className="users-page-area">
            <UsersSearchArea searchFields={searchFields}
                             usersSearchInfo={usersSearchInfo}
                             setUsersSearchInfo={setUsersSearchInfo}
                             setIsSearched={setIsUserDataSearched}
                             isSearched={isUserDataSearched}
                             setIsUserDataChanged={setIsUserDataChanged}
                             isUserDataChanged={isUserDataChanged} />
            <div className="users-table-div">
                <Table whichTable="users" 
                       datas={users}
                       banks={banks.payload}
                       onClickEditButton={(user) => {
                           setSelectedUser(user);
                           setOpenCloseEditModal(true);
                       }}
                       onClickDeleteButton={(user) => {
                           setSelectedUser(user);
                           setOpenCloseDeleteModal(true);
                       }} />
            </div>
            <div className={`users-page-pagination${paginationLeftMarginClassname}`}>
                <PaginationComponent pageCount={usersPageCount}
                                     setPage={setUsersPage} />
            </div>
            {openCloseModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseModal(false)} 
                                isOpen={openCloseModal} 
                                title="Connection error!"
                                body={<ErrorModalBody />}
                                bgcolor="red"
                />
            }
            {openCloseEditModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseEditModal(false)} 
                                isOpen={openCloseEditModal} 
                                title={t("changeUserData.changeUserData")}
                                body={<ChangeUserData user={selectedUser}
                                                      setIsUserDataChanged={setIsUserDataChanged}
                                                      isUserDataChanged={isUserDataChanged}
                                                      onCloseHandler={() => setOpenCloseEditModal(false)} />}
                />
            }
            {openCloseDeleteModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseDeleteModal(false)} 
                                isOpen={openCloseDeleteModal}
                                title={t("deleteUserData.deleteUserData")}
                                body={<DeleteUserData user={selectedUser}
                                                      setIsUserDataDeleted={setIsUserDataDeleted}
                                                      isUserDataDeleted={isUserDataDeleted}
                                                      onCloseHandler={() => setOpenCloseDeleteModal(false)} />}
                />
            }
        </div>
    );
};

export default UsersPage;