import "./SearchInputField.css";

const SearchInputField = ({
    label,
    onChangeHandler,
    classNameDiv,
    classNameLabel,
    classNameInput
}) => {
    return (
        <div className={`search-input-div ${classNameDiv}`}>
            <label htmlFor="forSearchInput" 
                   className={`search-input-label ${classNameLabel}`}
            >
                {label}
            </label> <br />
            <input type="text" 
                   name="searchInput" 
                   id="forSearchInput" 
                   onChange={onChangeHandler}
                   className={`search-input-field ${classNameInput}`} 
            />
        </div>       
    );
};

export default SearchInputField;