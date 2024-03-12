import "./TermPageSearchArea.css";
import SearchInputField from "../../../generalComponents/inputFields/searchInputField/SearchInputField";
import SearchAreaButton from "../../../generalComponents/buttons/searchAreaButton/SearchAreaButton";
import { useState } from "react";

const TermPageSearchArea = () => {
    const [ inputValue, setInputValue ] = useState("");

    const searchHandler = (evt) => {
        evt.preventDefault();

        console.log(inputValue);
    };

    return (
        <div className="terminals-page-search-area">
            <div className="terminals-page-search-export-content">
                <form className="terminals-page-search-form" onSubmit={searchHandler}>
                    <SearchInputField label="Որոնում" onChangeHandler={(evt) => {
                        console.log(evt.target.value);
                        setInputValue(evt.target.value);
                    }}/>
                    <SearchAreaButton type="submit"
                                      label="Որոնել" 
                                      searchIcon={true} 
                                      classNameBtn="terminals-page-search-btn"
                                    //   onClickHandler={() => searchHandler()} 
                    />
                </form>
                <SearchAreaButton label="Արտահանել" classNameBtn="terminals-page-export-btn" />
            </div>
            
            <div className="terminals-page-add-new-term">
                <SearchAreaButton label="Ավելացնել նոր տերմինալ" />
            </div>
        </div>
    );
};

export default TermPageSearchArea;