import "./SearchAreaButton.css";

const SearchAreaButton = ({ 
    label,
    searchIcon,
    classNameBtn
}) => {
    return (
        <button className={`search-area-button ${classNameBtn}`}>
            {label}
            {searchIcon &&
                <img src={process.env.PUBLIC_URL + "search.svg"} alt="search" />
            }
        </button>
    );
};

export default SearchAreaButton;