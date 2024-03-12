import "./SearchAreaButton.css";

const SearchAreaButton = ({ 
    type,
    label,
    searchIcon,
    classNameBtn,
    onClickHandler
}) => {
    return (
        <button type={type} className={`search-area-button ${classNameBtn}`} onClick={onClickHandler}>
            {label}
            {searchIcon &&
                <img src={process.env.PUBLIC_URL + "search.svg"} alt="search" />
            }
        </button>
    );
};

export default SearchAreaButton;