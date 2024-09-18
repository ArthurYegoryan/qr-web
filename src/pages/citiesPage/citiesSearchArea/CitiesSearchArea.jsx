import TextInputComponent from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import { addNumeration } from "../../../utils/helpers/addNumeration";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const CitiesSearchArea = ({
    setCities,
    citiesAll,
    makeCallForCitiesPageData,
    setMakeCallForCitiesPageData,
    pageSize,
    setIsSearchedCitiesData,
    setSearhedCitiesPageCount,
    searchedCitiesCurrentPage
}) => {
    const [ matchedCities, setMatchedCities ] = useState([]);
    const [ prevPage, setPrevPage ] = useState(1);
    const { t } = useTranslation();

    const citiesPageDataDetector = () => {
        const searchedCitiesByPage = [];
        for (let i = 0; i < (matchedCities.length < pageSize ? matchedCities.length : pageSize); i++) {
            const currentCity = matchedCities[(searchedCitiesCurrentPage - 1) * 10 + i];

            if (currentCity) searchedCitiesByPage.push(currentCity);
        }

        setIsSearchedCitiesData(true);
        setSearhedCitiesPageCount(Math.ceil(matchedCities.length / pageSize));

        setCities(addNumeration(searchedCitiesByPage, searchedCitiesCurrentPage, pageSize));
    };

    if (searchedCitiesCurrentPage !== prevPage) {
        setPrevPage(searchedCitiesCurrentPage);
        citiesPageDataDetector();
    }

    const onChangeHandler = (e) => {
        if (e) {
            const matchedCities = [];

            citiesAll.map((city) => {
                if (city.name_am.toLowerCase().includes((e.target.value).toLowerCase()) ||
                    city.name_en.toLowerCase().includes((e.target.value).toLowerCase())
                ) {
                    matchedCities.push(city);
                }
            });

            setMatchedCities(matchedCities);

            const searchedCitiesByPage = [];
            for (let i = 0; i < (matchedCities.length < pageSize ? matchedCities.length : pageSize); i++) {
                searchedCitiesByPage.push(matchedCities[(searchedCitiesCurrentPage - 1) * 10 + i]);
            }

            setIsSearchedCitiesData(true);
            setSearhedCitiesPageCount(Math.ceil(matchedCities.length / pageSize));

            setCities(addNumeration(searchedCitiesByPage, searchedCitiesCurrentPage, pageSize));
        } else {
            setMakeCallForCitiesPageData(!makeCallForCitiesPageData);
        }
    };

    return (
        <div className="cities-search-area">
            <TextInputComponent placeholder={t("citiesSection.city")}
                                isSearchInput={true}
                                onChangeHandler={onChangeHandler} />
        </div>
    );
};

export default CitiesSearchArea;