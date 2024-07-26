import "./TermPageSearchArea.css";
import Button from "../../../generalComponents/buttons/Button";
import SelectComponent from "../../../generalComponents/inputFields/selectComponent/SelectComponent";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import WillBeSoonModalBody from "../../../generalComponents/modalComponent/willBeSoonModalBody/WillBeSoonModalBody";
import AddNewTerminalData from "./addNewTerminal/AddNewTerminalData";
import SearchIcon from '@mui/icons-material/Search';
import { searchingValidation } from "../../../utils/helpers/searchingValidation";
import { useState } from "react";
import { useSelector } from "react-redux";
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
    const role = useSelector((state) => state.auth.role.payload) ?? localStorage.getItem("role");
    const [ isOpenErrorModal, setIsOpenErrorModal ] = useState(false);
    const [ isOpenAddTermModal, setIsOpenAddTermModal ] = useState(false);
    const [ openCloseWillBeSoonModal, setOpenCloseWillBeSoonModal ] = useState(false);
    const [ prevSearchInfo, setPrevSearchInfo ] = useState({...terminalsSearchInfo});
    const [ searchByFieldEmptyError, setSearchByFieldEmptyError ] = useState(false);
    const [ searchDataFieldEmptyError, setSearchDataFieldEmptyError ] = useState(false);

    const { t } = useTranslation();

    return (
        <>
            <div className="terminals-page-search-area">
                <div className="terminals-page-search-export-content">
                    <form className="terminals-page-search-form" onSubmit={(evt) => {
                        evt.preventDefault();

                        searchingValidation(
                            terminalsSearchInfo,
                            setTerminalsSearchInfo,
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
                                         fields={terminalsSearchInfo}
                                         changeFieldName="searchField"
                                         setField={setTerminalsSearchInfo}
                                         hasFirstRow={true}
                                         firstRowLabel="------"
                                         firstRowValue=""
                                         width="200px"
                                         existsError={searchByFieldEmptyError}
                                         errorText={t("searchArea.emptyFieldError")} 
                                         onChooseHandler={() => setSearchByFieldEmptyError(false) }/>
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
                            onClickHandler={() => {
                                setOpenCloseWillBeSoonModal(true);
                            }} />
                </div>
                {/* {(role === "admin" || role === "bank") &&
                    <div className="terminals-page-add-new-term">
                        <Button label={t("addNewTerminal.addNewTerminal")}
                                marginTop="5px" 
                                onClickHandler={() => setIsOpenAddTermModal(true)} />
                    </div>
                } */}
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
            {openCloseWillBeSoonModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseWillBeSoonModal(false)} 
                                isOpen={openCloseWillBeSoonModal} 
                                title={t("export.export")}
                                body={<WillBeSoonModalBody onCloseHandler={() => setOpenCloseWillBeSoonModal(false)} />} />      
            }
        </>        
    );
};

export default TermPageSearchArea;