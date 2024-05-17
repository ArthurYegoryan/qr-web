export const searchingValidation = (
    searchInfo,
    setSearchInfo,
    prevSearchInfo,
    setPrevSearchInfo,
    isSearched,
    setIsSearched,
    setSearchDataFieldEmptyError,
    setSearchByFieldEmptyError
) => {
    let hasSearchParam = false;

    for (const key in searchInfo) {
        if (searchInfo[key] && key !== "hasSearchParams") {
            hasSearchParam = true;
        }
    }

    if (hasSearchParam) {
        if (searchInfo.searchField && !searchInfo.searchValue) {
            setSearchDataFieldEmptyError(true);
        } else if (!searchInfo.searchField && searchInfo.searchValue) {
            setSearchByFieldEmptyError(true);
        } else {
            let doSearch = false;

            for (const key in searchInfo) {
                if (searchInfo[key] !== prevSearchInfo[key]) doSearch = true;
            }

            if (doSearch) {                            
                setSearchInfo({
                    ...searchInfo, 
                    hasSearchParams: true
                });
                setIsSearched(!isSearched);
                setPrevSearchInfo({
                    ...searchInfo, 
                    hasSearchParams: true
                });
                setSearchByFieldEmptyError(false);
                setSearchDataFieldEmptyError(false);
            }
        }                    
    } else {
        let doSearch = false;

        for (const key in searchInfo) {
            if (searchInfo[key] !== prevSearchInfo[key]) doSearch = true;
        }

        if (doSearch) {
            setSearchInfo({
                ...searchInfo, 
                hasSearchParams: false
            });
            setIsSearched(!isSearched);
            setPrevSearchInfo({
                ...searchInfo, 
                hasSearchParams: false
            });
            setSearchByFieldEmptyError(false);
            setSearchDataFieldEmptyError(false);
        } else {
            setSearchByFieldEmptyError(false);
            setSearchDataFieldEmptyError(false);
        }
    }
};