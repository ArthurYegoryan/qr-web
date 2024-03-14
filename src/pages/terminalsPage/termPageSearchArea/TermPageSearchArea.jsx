import "./TermPageSearchArea.css";
import SearchInputField from "../../../generalComponents/inputFields/searchInputField/SearchInputField";
import SearchAreaButton from "../../../generalComponents/buttons/searchAreaButton/SearchAreaButton";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import { useState } from "react";

const TermPageSearchArea = ({ 
    searchHandler, 
    setInputValue, 
    isSearched, 
    resetSearch 
}) => {
    const [ isOpenErrorModal, setIsOpenErrorModal ] = useState(false);

    return (
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
                <SearchAreaButton label="Ավելացնել նոր տերմինալ" />
            </div>
            {isOpenErrorModal &&
                <ModalComponent onCloseHandler={() => setIsOpenErrorModal(false)}
                                isOpen={isOpenErrorModal}
                                title="Որոնման սխալ"
                                body={<ErrorModalBody />}
                                bgcolor="red" 
                />
            }
        </div>
    );
};

export default TermPageSearchArea;