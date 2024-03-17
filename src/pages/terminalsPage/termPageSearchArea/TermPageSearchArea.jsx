import "./TermPageSearchArea.css";
import SearchInputField from "../../../generalComponents/inputFields/searchInputField/SearchInputField";
import SearchAreaButton from "../../../generalComponents/buttons/searchAreaButton/SearchAreaButton";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import AddNewTerminalData from "./addNewTerminal/AddNewTerminalData";
import { useState } from "react";

const TermPageSearchArea = ({ 
    searchHandler, 
    setInputValue, 
    isSearched, 
    resetSearch,
    setIsTermDataChanged,
    isTermDataChanged
}) => {
    const [ isOpenErrorModal, setIsOpenErrorModal ] = useState(false);
    const [ isOpenAddTermModal, setIsOpenAddTermModal ] = useState(false);

    return (
        <>
            <div className="terminals-page-search-area">
                <div className="terminals-page-search-export-content">
                    <form className="terminals-page-search-form" onSubmit={searchHandler}>
                        <SearchInputField label="Որոնում"
                                        isSearched={isSearched}
                                        resetSearch={resetSearch}
                                        onChangeHandler={
                                            (evt) => setInputValue(evt.target.value)
                                        }
                        />
                        <SearchAreaButton type="submit"
                                        label="Որոնել" 
                                        searchIcon={true} 
                                        classNameBtn="terminals-page-search-btn"
                        />
                    </form>
                    <SearchAreaButton label="Արտահանել" classNameBtn="terminals-page-export-btn" />
                </div>            
                <div className="terminals-page-add-new-term">
                    <SearchAreaButton label="Ավելացնել նոր տերմինալ"
                                    onClickHandler={() => setIsOpenAddTermModal(true)} 
                    />
                </div>                
            </div>
            {isOpenAddTermModal &&
                <ModalComponent onCloseHandler={() => setIsOpenAddTermModal(false)} 
                                isOpen={isOpenAddTermModal}
                                title="Ավելացնել նոր տերմինալ"
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