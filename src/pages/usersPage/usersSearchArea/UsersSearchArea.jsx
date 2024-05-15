import "./UsersSearchArea.css";
import Button from "../../../generalComponents/buttons/Button";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../generalComponents/inputFields/selectComponent/SelectComponent";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import AddNewUser from "./addNewUser/AddNewUser";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const UsersSearchArea = ({ 
    searchFields,
    usersSearchInfo,
    setUsersSearchInfo,
    setIsSearched,
    isSearched,
    setIsUserDataChanged,
    isUserDataChanged
}) => {
    const [ isOpenErrorModal, setIsOpenErrorModal ] = useState(false);
    const [ isOpenAddUser, setIsOpenAddUserModal ] = useState(false);
    const [ prevSearchInfo, setPrevSearchInfo ] = useState({...usersSearchInfo});
    const [ onceAlreadySearced, setOnceAlreadySearched ] = useState(false);

    const { t } = useTranslation();

    return (
        <>
            <div className="users-page-search-area">
                <div className="users-page-search-export-content">
                    <form className="users-page-search-form" onSubmit={(evt) => {
                        evt.preventDefault();

                        let searchInfoIsOK = true;
                        let doSearch = false;

                        if (!onceAlreadySearced) {
                            for (const key in usersSearchInfo) {
                                if (!usersSearchInfo[key]) {
                                    searchInfoIsOK = false;
                                }
                            }
    
                            if (searchInfoIsOK) {
                                for (const key in usersSearchInfo) {
                                    if (usersSearchInfo[key] !== prevSearchInfo[key]) {
                                        doSearch = true;
                                    }
                                } 
                            }
    
                            if (doSearch) {
                                setPrevSearchInfo(usersSearchInfo);
                                setIsSearched(!isSearched);
                                setOnceAlreadySearched(true);
                            }
                        } else {
                            let allValuesExist = true;
                            let allValuesDontExist = true;
                            let allFieldsLength = 0;

                            Object.values(usersSearchInfo).map((field => {
                                if (!field.length) {
                                    allValuesExist = false;
                                }
                                
                                allFieldsLength += field.length;
                            }));

                            if (allFieldsLength) allValuesDontExist = false;

                            if (allValuesExist) {
                                let doSearch = false;

                                for (const key in usersSearchInfo) {
                                    if (usersSearchInfo[key] !== prevSearchInfo[key]) {
                                        doSearch = true;
                                    }
                                }

                                if (doSearch) {
                                    setPrevSearchInfo(usersSearchInfo);
                                    setIsSearched(!isSearched);
                                }
                            }
                            
                            if (allValuesDontExist) {
                                setPrevSearchInfo(usersSearchInfo);
                                setIsSearched(!isSearched);
                                setOnceAlreadySearched(false);
                            }
                        }
                    }}>
                        <SelectComponent label={t("searchArea.searchBy")}
                                         chooseData={searchFields}
                                         fields={usersSearchInfo}
                                         changeFieldName="searchField"
                                         setField={setUsersSearchInfo}
                                         hasFirstRow={true}
                                         firstRowLabel="------"
                                         firstRowValue=""
                                         width="150px" />
                        <TextInput label={t("searchArea.searchData")}
                                   onChangeHandler={(evt) => setUsersSearchInfo({ 
                                       ...usersSearchInfo,
                                    //    hasSearchParams: true,
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