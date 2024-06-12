import "./BanksPageSearchArea.css";
import Button from "../../../generalComponents/buttons/Button";
import SelectComponent from "../../../generalComponents/inputFields/selectComponent/SelectComponent";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import AddNewBank from "./addNewBank/AddNewBank";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { searchingValidation } from "../../../utils/helpers/searchingValidation";

const BanksPageSearchArea = ({ 
    searchFields,
    banksSearchInfo,
    setBanksSearchInfo,
    isSearched,
    setIsSearched,
    setIsBankDataChanged,
    isBankDataChanged
}) => {
    const [ isOpenErrorModal, setIsOpenErrorModal ] = useState(false);
    const [ isOpenAddBankModal, setIsOpenAddBankModal ] = useState(false);
    const [ prevSearchInfo, setPrevSearchInfo ] = useState({...banksSearchInfo});
    const [ searchByFieldEmptyError, setSearchByFieldEmptyError ] = useState(false);
    const [ searchDataFieldEmptyError, setSearchDataFieldEmptyError ] = useState(false);

    const { t } = useTranslation();

    return (
        <>
            <div className="banks-page-search-area">
                <div className="banks-page-search-export-content">
                    <form className="banks-page-search-form" onSubmit={(evt) => {
                        evt.preventDefault();

                        searchingValidation(
                            banksSearchInfo,
                            setBanksSearchInfo,
                            prevSearchInfo,
                            setPrevSearchInfo,
                            isSearched,
                            setIsSearched,
                            setSearchDataFieldEmptyError,
                            setSearchByFieldEmptyError
                        );
                    }}>
                        <SelectComponent label={t("searchArea.searchBy")}
                                         chooseData={searchFields}
                                         fields={banksSearchInfo}
                                         changeFieldName="searchField"
                                         setField={setBanksSearchInfo}
                                         hasFirstRow={true}
                                         firstRowLabel="------"
                                         firstRowValue=""
                                         width="200px"
                                         existsError={searchByFieldEmptyError}
                                         errorText={t("searchArea.emptyFieldError")} 
                                         onChooseHandler={() => setSearchByFieldEmptyError(false)}/>
                        <TextInput label={t("searchArea.searchData")}
                                   existsError={searchDataFieldEmptyError}
                                   errorText={t("searchArea.emptyFieldError")}
                                   onChangeHandler={(evt) => {
                                       setSearchDataFieldEmptyError(false);
                                       setBanksSearchInfo({ 
                                           ...banksSearchInfo,
                                           searchValue: (evt.target.value)
                                       })}
                                   }/>
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
                            onClickHandler={() => console.log("Export banks data")} />
                </div>            
                <div className="banks-page-add-new-bank">
                    <Button label={t("banks.addNewBank")}
                            marginTop="5px" 
                            onClickHandler={() => setIsOpenAddBankModal(true)} />
                </div>                
            </div>
            {isOpenAddBankModal &&
                <ModalComponent onCloseHandler={() => setIsOpenAddBankModal(false)} 
                                isOpen={isOpenAddBankModal}
                                title={t("banks.addNewBank")}
                                body={<AddNewBank setIsBankDataChanged={setIsBankDataChanged}
                                                  isBankDataChanged={isBankDataChanged}
                                                  onCloseHandler={() => setIsOpenAddBankModal(false)} 
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

export default BanksPageSearchArea;