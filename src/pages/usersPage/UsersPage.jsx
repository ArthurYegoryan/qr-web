import "./UsersPage.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import getUsersByPage from "../../api/getUsersByPage";
import getBanks from "../../api/getBanks";
import { urls } from "../../constants/urls/urls";
import { useDispatch } from "react-redux";
import { editToken, logoutUser } from "../../redux/slices/authorization/auth";
import { Navigate } from "react-router-dom";
import ModalComponent from "../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import UsersTable from "./usersTable/UsersTable";
import PaginationComponent from "../../generalComponents/pagination/Pagination";
import UsersSearchArea from "./usersSearchArea/UsersSearchArea";
import { usersTableFields } from "../../constants/tableFields/usersTableFields";

const UsersPage = () => {
    const [ users, setUsers ] = useState([]);
    const [ usersPageCount, setUsersPageCount ] = useState(1);
    const [ usersSearchInfo, setUsersSearchInfo ] = useState({
        searchField: "",
        searchValue: ""
    });
    const [ usersPage, setUsersPage ] = useState(1);
    const [ isUserDataChanged, setIsUserDataChanged ] = useState(false);
    const [ isUserDataDeleted, setIsUserDataDeleted ] = useState(false);
    const [ isUserDataSearched, setIsUserDataSearched ] = useState(false);
    const [ openCloseModal, setOpenCloseModal ] = useState(false);
    const { isMenuOpen } = useSelector((state) => state.menu);
    const dispatch = useDispatch();

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
        console.log("User search info", JSON.stringify(usersSearchInfo, null, 2));
        try {
            const getUsersBanksData = async () => {
                const responseBanks = await getBanks(urls.GET_BANKS_URL);
                const responseUsers = await getUsersByPage(
                    urls.GET_USERS_URL,
                    {
                        page: usersPage,
                        searchParams: usersSearchInfo 
                    }
                );

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
                    setUsersPageCount(responseUsers.users_page_count);
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
                <UsersTable users={users}
                            setIsUserDataChanged={setIsUserDataChanged}
                            isUserDataChanged={isUserDataChanged}
                            setIsUserDataDeleted={setIsUserDataDeleted}
                            isUserDataDeleted={isUserDataDeleted} />
            </div>
            {openCloseModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseModal(false)} 
                                isOpen={openCloseModal} 
                                title="Connection error!"
                                body={<ErrorModalBody />}
                                bgcolor="red"
                />
            }
            <div className={`users-page-pagination${paginationLeftMarginClassname}`}>
                <PaginationComponent pageCount={usersPageCount}
                                     setPage={setUsersPage} />
            </div>
        </div>
    );
};

export default UsersPage;