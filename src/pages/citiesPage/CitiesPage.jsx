import "./CitiesPage.css";
import Table from "../../generalComponents/table/Table";
import Pagination from "../../generalComponents/pagination/Pagination";
import Loader from "../../generalComponents/loaders/Loader";
import { addNumeration } from "../../utils/helpers/addNumeration";
import { getDataApi } from "../../apis/getDataApi";
import { urls } from "../../constants/urls/urls";
import { editToken } from "../../redux/slices/authorization/authSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CitiesPage = () => {
    const [ cities, setCities ] = useState([]);
    const [ citiesPageCount, setCitiesPageCount ] = useState(1);
    const [ citiesCurrentPage, setCitiesCurrentPage ] = useState(1);
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
        const callForCitiesPages = async () => {
            try {
                setShowLoading(true);
                const response = await getDataApi(urls.CITIES_PAGE_URL + `?page=${citiesCurrentPage}&size=${pageSize}`);
                setShowLoading(false);

                if (response.status === 200) {
                    setCities(addNumeration(response.data.items, citiesCurrentPage, pageSize));
                    setCitiesPageCount(response.data.pages);
                    setCitiesCurrentPage(response.data.page);
                } else if (response.status === 401) {
                    localStorage.clear();
                    dispatch(editToken(""));

                    navigate(urls.LOGIN_URL);
                }
            } catch (err) {
                console.log(err);
            }
        };
        callForCitiesPages();
    }, [citiesCurrentPage]);

    return (
        <div className="cities-page-area">
            <div className="cities-page-table-area">
                <Table whichTable={"cities"}
                       datas={cities}
                       scroll={false} />
            </div>
            <Pagination pageCount={citiesPageCount}
                        setPage={setCitiesCurrentPage}
                        leftMargin={paginationLeftMarginClassname} />
            {showLoading &&
                <Loader />
            }
        </div>
    );
};

export default CitiesPage;