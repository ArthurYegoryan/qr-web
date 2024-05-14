import "./UsersSearchArea.css";
import Button from "../../../generalComponents/buttons/Button";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import AddNewUser from "./addNewUser/AddNewUser";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const UsersSearchArea = ({ 
    usersSearchInfo,
    setUsersSearchInfo,
    setIsSearched,
    setIsUserDataChanged,
    isUserDataChanged
}) => {
    const [ isOpenErrorModal, setIsOpenErrorModal ] = useState(false);
    const [ isOpenAddUser, setIsOpenAddUserModal ] = useState(false);

    const { t } = useTranslation();

    return (
        <>
            <div className="users-page-search-area">
                <div className="users-page-search-export-content">
                    <form className="users-page-search-form" onSubmit={(evt) => {
                        evt.preventDefault();

                        if(!usersSearchInfo.searchValue) {
                            setUsersSearchInfo({
                                ...usersSearchInfo,
                                hasSearchParams: false
                            });
                            setIsSearched(false);
                        } else {
                            setIsSearched(true);
                        }
                    }}>
                        <TextInput label={t("searchArea.searchData")}
                                   onChangeHandler={(evt) => setUsersSearchInfo({ 
                                       ...usersSearchInfo,
                                       hasSearchParams: true,
                                       searchValue: (evt.target.value)
                                   })} />
                        <Button type="submit" 
                                label={t("searchArea.searchBtn")}
                                endIcon={<SearchIcon />}
                                height="30px"
                                marginLeft="10px"
                                marginTop="5px" />
                    </form>
                    <Button label={t("export.export")} 
                            height="30px"
                            marginTop="5px"
                            marginLeft="10px" 
                            onClickHandler={() => console.log("Export users data")} />
                </div>            
                <div className="users-page-add-new-user">
                    <Button label={t("addNewUser")}
                            marginTop="5px" 
                            onClickHandler={() => setIsOpenAddUserModal(true)} />
                </div>
            </div>
            {isOpenAddUser &&
                <ModalComponent onCloseHandler={() => setIsOpenAddUserModal(false)} 
                                isOpen={isOpenAddUser}
                                title={t("addNewUser")}
                                body={<AddNewUser setIsUserDataChanged={setIsUserDataChanged}
                                                  isUserDataChanged={isUserDataChanged}
                                                  onCloseHandler={() => setIsOpenAddUserModal(false)} 
                                    />}
                />
            }
            {isOpenErrorModal &&
                <ModalComponent onCloseHandler={() => setIsOpenErrorModal(false)}
                                isOpen={isOpenErrorModal}
                                title="Որոնման սխալ"
                                body={<ErrorModalBody />}
                                bgcolor="red" 
                />
            }
        </>
    );
};

export default UsersSearchArea;