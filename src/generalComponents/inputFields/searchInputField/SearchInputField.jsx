import "./SearchInputField.css";

const SearchInputField = ({
    label,
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
                   className={`search-input-field ${classNameInput}`} 
            />
        </div>       
    );
};

export default SearchInputField;