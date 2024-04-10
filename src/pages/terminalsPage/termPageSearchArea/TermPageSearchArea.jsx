import "./TermPageSearchArea.css";
import SearchButton from "../../../generalComponents/buttons/Button";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import AddNewTerminalData from "./addNewTerminal/AddNewTerminalData";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const TermPageSearchArea = ({ 
    terminalsSearchInfo,
    setTerminalsSearchInfo,
    setIsSearched,
    setIsTermDataChanged,
    isTermDataChanged
}) => {
    const [ isOpenErrorModal, setIsOpenErrorModal ] = useState(false);
    const [ isOpenAddTermModal, setIsOpenAddTermModal ] = useState(false);

    const { t } = useTranslation();

    return (
        <>
            <div className="terminals-page-search-area">
                <div className="terminals-page-search-export-content">
                    <form className="terminals-page-search-form" onSubmit={(evt) => {
                        evt.preventDefault();

                        if(!terminalsSearchInfo.searchValue) {
                            setTerminalsSearchInfo({
                                ...terminalsSearchInfo,
                                hasSearchParams: false
                            });
                            setIsSearched(false);
                        } else {
                            setIsSearched(true);
                        }
                    }}>
                        <TextInput label={t("searchArea.searchData")}
                                   onChangeHandler={(evt) => setTerminalsSearchInfo({ 
                                       ...terminalsSearchInfo,
                                       hasSearchParams: true,
                                       searchValue: (evt.target.value)
                                   })} />
                        <SearchButton type="submit" 
                                      label={t("searchArea.searchBtn")}
                                      endIcon={<SearchIcon />}
                                      height="30px"
                                      marginLeft="10px"
                                      marginTop="5px" />
                    </form>
                    <SearchButton label={t("export.export")} 
                                  height="30px"
                                  marginTop="5px"
                                  marginLeft="10px" 
                                  onClickHandler={() => console.log("Export terminals data")} />
                </div>            
                <div className="terminals-page-add-new-term">
                    <SearchButton label={t("addNewTerminal.addNewTerminal")}
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