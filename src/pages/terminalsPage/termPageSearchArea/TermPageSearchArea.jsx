import "./TermPageSearchArea.css";
import Button from "../../../generalComponents/buttons/Button";
import SelectComponent from "../../../generalComponents/inputFields/selectComponent/SelectComponent";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import AddNewTerminalData from "./addNewTerminal/AddNewTerminalData";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const TermPageSearchArea = ({ 
    searchFields,
    terminalsSearchInfo,
    setTerminalsSearchInfo,
    isSearched,
    setIsSearched,
    setIsTermDataChanged,
    isTermDataChanged
}) => {
    const [ isOpenErrorModal, setIsOpenErrorModal ] = useState(false);
    const [ isOpenAddTermModal, setIsOpenAddTermModal ] = useState(false);
    const [ prevSearchInfo, setPrevSearchInfo ] = useState({...terminalsSearchInfo});
    const [ onceAlreadySearced, setOnceAlreadySearched ] = useState(false);
    const [ searchByFieldEmptyError, setSearchByFieldEmptyError ] = useState(false);
    const [ searchDataFieldEmptyError, setSearchDataFieldEmptyError ] = useState(false);

    const { t } = useTranslation();

    return (
        <>
            <div className="terminals-page-search-area">
                <div className="terminals-page-search-export-content">
                    <form className="terminals-page-search-form" onSubmit={(evt) => {
                        evt.preventDefault();

                        let searchInfoIsOK = true;
                        let doSearch = false;

                        if (!onceAlreadySearced) {
                            if (!terminalsSearchInfo.searchField && !terminalsSearchInfo.searchValue) {
                                searchInfoIsOK = false;
                                setSearchByFieldEmptyError(true);
                                setSearchDataFieldEmptyError(true);
                            }
                            else if (!terminalsSearchInfo.searchField) {
                                searchInfoIsOK = false;
                                setSearchByFieldEmptyError(true);
                            }
                            else if (!terminalsSearchInfo.searchValue) {
                                searchInfoIsOK = false;
                                setSearchDataFieldEmptyError(true);
                            }
    
                            if (searchInfoIsOK) {
                                for (const key in terminalsSearchInfo) {
                                    if (terminalsSearchInfo[key] !== prevSearchInfo[key]) {
                                        doSearch = true;
                                    }
                                } 
                            }
    
                            if (doSearch) {
                                setPrevSearchInfo(terminalsSearchInfo);
                                setIsSearched(!isSearched);
                                setOnceAlreadySearched(true);
                            }
                        } else {
                            if (!terminalsSearchInfo.searchField && terminalsSearchInfo.searchValue) setSearchByFieldEmptyError(true);
                            else if (terminalsSearchInfo.searchField && !terminalsSearchInfo.searchValue) setSearchDataFieldEmptyError(true);
                            else {
                                let allValuesExist = true;
                                let allValuesDontExist = true;
                                let allFieldsLength = 0;

                                Object.values(terminalsSearchInfo).map((field => {
                                    if (!field.length) {
                                        allValuesExist = false;
                                    }
                                    
                                    allFieldsLength += field.length;
                                }));

                                if (allFieldsLength) allValuesDontExist = false;

                                if (allValuesExist) {
                                    let doSearch = false;

                                    for (const key in terminalsSearchInfo) {
                                        if (terminalsSearchInfo[key] !== prevSearchInfo[key]) {
                                            doSearch = true;
                                        }
                                    }

                                    if (doSearch) {
                                        setPrevSearchInfo(terminalsSearchInfo);
                                        setIsSearched(!isSearched);
                                    }
                                }
                                
                                if (allValuesDontExist) {
                                    setPrevSearchInfo(terminalsSearchInfo);
                                    setIsSearched(!isSearched);
                                    setOnceAlreadySearched(false);
                                    setSearchByFieldEmptyError(false);
                                    setSearchDataFieldEmptyError(false);
                                }
                            }
                        }
                    }}>
                        <SelectComponent label={t("searchArea.searchBy")}
                                         chooseData={searchFields}
                                         fields={terminalsSearchInfo}
                                         changeFieldName="searchField"
                                         setField={setTerminalsSearchInfo}
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
                                       setTerminalsSearchInfo({ 
                                           ...terminalsSearchInfo,
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
                            onClickHandler={() => console.log("Export terminals data")} />
                </div>            
                <div className="terminals-page-add-new-term">
                    <Button label={t("addNewTerminal.addNewTerminal")}
                            marginTop="5px" 
                            onClickHandler={() => setIsOpenAddTermModal(true)} />
                </div>                
            </div>
            {isOpenAddTermModal &&
                <ModalComponent onCloseHandler={() => setIsOpenAddTermModal(false)} 
                                isOpen={isOpenAddTermModal}
                                title={t("addNewTerminal.addNewTerminal")}
                                body={<AddNewTerminalData setIsTermDataChanged={setIsTermDataChanged}
                                                        isTermDataChanged={isTermDataChanged}
                                                        onCloseHandler={() => setIsOpenAddTermModal(false)} 
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

export default TermPageSearchArea;