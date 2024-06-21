import "./UsersPage.css";
import ChangeUserData from "./changeUserData/ChangeUserData";
import DeleteUserData from "./deleteUserData/DeleteUserData";
import UsersSearchArea from "./usersSearchArea/UsersSearchArea";
import Table from "../../generalComponents/table/Table";
import ModalComponent from "../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import PaginationComponent from "../../generalComponents/pagination/Pagination";
import getUsersByPage from "../../api/getUsersByPage";
import getAllBanks from "../../api/getAllBanks";
import getRoles from "../../api/getRoles";
import { urls } from "../../constants/urls/urls";
import { usersSearchFields } from "../../constants/tableFields/usersSearchFields";
import { makeObjFieldsToString } from "../../utils/helpers/makeObjFieldsToString";
import { saveBanks, saveBanksAllData } from "../../redux/slices/banks/banksSlice";
import { saveRoles } from "../../redux/slices/roles/rolesSlice";
import { editToken } from "../../redux/slices/authorization/authSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
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

    let paginationLeftMarginClassname = "";
    if (isMenuOpen) paginationLeftMarginClassname = "-open-menu";
    else paginationLeftMarginClassname = "-close-menu";

    useEffect(() => {
        try {
            const getBanksData = async () => {
                const responseBanks = await getAllBanks(urls.GET_BANKS_URL);
                const reponseRoles = await getRoles(urls.GET_ROLES_URL);
                
                if (responseBanks.message === "success" && reponseRoles.message === "success") {
                    dispatch(saveBanksAllData(responseBanks.banks));
                    dispatch(saveRoles(reponseRoles.roles));

                    const banks = {};

                    responseBanks.banks.map((bank) => {
                        banks[bank.id] = bank.short_name;
                    });

                    dispatch(saveBanks(banks));
                } else if (responseBanks.message === "expired token") {
                    localStorage.clear();
                    dispatch(editToken(""));
            
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
                    setUsers(makeObjFieldsToString(responseUsers.users));
                    setUsersPageCount(responseUsers.users_page_count);
                } else if (responseUsers.message === "expired token") {
                    localStorage.clear();
                    dispatch(editToken(""));
            
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
            <UsersSearchArea searchFields={usersSearchFields}
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
                       setCurrentData={setSelectedUser}
                       onClickEditButton={() => setOpenCloseEditModal(true)}
                       onClickDeleteButton={() => setOpenCloseDeleteModal(true)} />
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