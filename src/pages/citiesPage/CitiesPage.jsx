import "./CitiesPage.css";
import CitiesSearchArea from "./citiesSearchArea/CitiesSearchArea";
import Table from "../../generalComponents/table/Table";
import Pagination from "../../generalComponents/pagination/Pagination";
import Loader from "../../generalComponents/loaders/Loader";
import { addNumeration } from "../../utils/helpers/addNumeration";
import { getDataApi } from "../../apis/getDataApi";
import { refreshTokenMakeCall } from "../../utils/helpers/refreshTokenMakeCall";
import { paths } from "../../constants/paths/paths";
import { urls } from "../../constants/urls/urls";
import { editToken } from "../../redux/slices/authorization/authSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CitiesPage = () => {
    const [ makeCallForCitiesPageData, setMakeCallForCitiesPageData ] = useState(false);
    const [ citiesAll, setCitiesAll ] = useState([]);
    const [ cities, setCities ] = useState([]);
    const [ citiesPageCount, setCitiesPageCount ] = useState(1);
    const [ citiesCurrentPage, setCitiesCurrentPage ] = useState(1);

    const [ isSearchedCitiesData, setIsSearchedCitiesData ] = useState(false);
    const [ searchedCitiesPageCount, setSearchedCitiesPageCount ] = useState(1);
    const [ searchedCitiesCurrentPage, setSearchedCitiesCurrentPage ] = useState(1);

    const [ showLoading, setShowLoading ] = useState(false);
    const { isMenuOpen } = useSelector((state) => state.menu);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const windowHeight = window.screen.height;
    const pageSize = windowHeight < 950 ? 7 : 10;

    let paginationLeftMarginClassname = "";
    if (isMenuOpen) paginationLeftMarginClassname = "-open-menu";
    else paginationLeftMarginClassname = "-close-menu";

    useEffect(() => {
        const callForAllCities = async () => {
            try {
                setShowLoading(true);
                const responseCities = await getDataApi(urls.CITIES_URL)
                setShowLoading(false);

                if (responseCities.status === 200) {
                    setCitiesAll(responseCities.data);
                } else if (responseCities.status === 401) {
                    const response = await refreshTokenMakeCall(
                        setShowLoading, 
                        [ getDataApi ], 
                        [urls.CITIES_URL]);

                    if (response.callsResponses.length) {
                        dispatch(editToken(response.responseRefreshToken.data.access_token));
                        localStorage.setItem("token", response.responseRefreshToken.data.access_token);

                        if (response.callsResponses[0].status === 200) {
                            setCitiesAll(response.callsResponses[0].data);
                        } else if (response.callsResponses[0].status === 401) {
                            localStorage.clear();
                            dispatch(editToken(""));
                    
                            navigate(paths.LOGIN);
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
        callForAllCities();
    }, []);

    useEffect(() => {
        const callForCitiesPages = async () => {
            try {
                setShowLoading(true);
                const response = await getDataApi(urls.CITIES_PAGE_URL + `?page=${citiesCurrentPage}&size=${pageSize}`);
                setShowLoading(false);

                if (response.status === 200) {
                    setCities(addNumeration(response.data.items, citiesCurrentPage, pageSize));
                    setCitiesPageCount(response.data.pages);
                    setCitiesCurrentPage(response.data.page);
                    setIsSearchedCitiesData(false);
                } else if (response.status === 401) {
                    const response = await refreshTokenMakeCall(
                        setShowLoading, 
                        [ getDataApi ], 
                        [urls.CITIES_PAGE_URL + `?page=${citiesCurrentPage}&size=${pageSize}`]);

                    if (response.callsResponses.length) {
                        dispatch(editToken(response.responseRefreshToken.data.access_token));
                        localStorage.setItem("token", response.responseRefreshToken.data.access_token);

                        if (response.callsResponses[0].status === 200) {
                            setCities(addNumeration(response.callsResponses[0].data.items, citiesCurrentPage, pageSize));
                            setCitiesPageCount(response.callsResponses[0].data.pages);
                            setCitiesCurrentPage(response.callsResponses[0].data.page);
                            setIsSearchedCitiesData(false);
                        } else if (response.callsResponses[0].status === 401) {
                            localStorage.clear();
                            dispatch(editToken(""));
                    
                            navigate(paths.LOGIN);
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
        callForCitiesPages();
    }, [citiesCurrentPage, makeCallForCitiesPageData]);

    return (
        <div className="cities-page-area">
            <div className="cities-page-search-area">
                <CitiesSearchArea setCities={setCities}
                                    citiesAll={citiesAll}
                                    makeCallForCitiesPageData={makeCallForCitiesPageData}
                                    setMakeCallForCitiesPageData={setMakeCallForCitiesPageData}
                                    pageSize={pageSize}
                                    setIsSearchedCitiesData={setIsSearchedCitiesData}
                                    setSearhedCitiesPageCount={setSearchedCitiesPageCount}
                                    searchedCitiesCurrentPage={searchedCitiesCurrentPage} />
            </div>
            <div className="cities-page-content">
                <div className="cities-page-table-area">
                    <Table whichTable={"cities"}
                            datas={cities}
                            scroll={false} />
                </div>
                <Pagination pageCount={isSearchedCitiesData ? searchedCitiesPageCount : citiesPageCount}
                            setPage={isSearchedCitiesData ? setSearchedCitiesCurrentPage : setCitiesCurrentPage}
                            leftMargin={paginationLeftMarginClassname} />
            </div>
            
            {showLoading &&
                <Loader />
            }
        </div>
    );
};

export default CitiesPage;