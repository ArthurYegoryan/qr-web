import "./MccCodesPage.css";
import MccCodesSearchArea from "./mccCodesSearchArea/MccCodesSearchArea";
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

const MccCodesPage = () => {
    const [ makeCallForMccPageData, setMakeCallForMccPageData ] = useState(false);
    const [ mccCodesAll, setMccCodesAll ] = useState([]);
    const [ mccCodes, setMccCodes ] = useState([]);
    const [ mccCodesPageCount, setMccCodesPageCount ] = useState(1);
    const [ mccCodesCurrentPage, setMccCodesCurrentPage ] = useState(1);

    const [ isSearchedMccsData, setIsSearchedMccsData ] = useState(false);
    const [ searhedMccCodesPageCount, setSearhedMccCodesPageCount ] = useState(1);
    const [ searchedMccCodesCurrentPage, setSearchedMccCodesCurrentPage ] = useState(1);

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
        const callForAllMccs = async () => {
            try {
                setShowLoading(true);
                const responseMccs = await getDataApi(urls.MCC_URL)
                setShowLoading(false);

                if (responseMccs.status === 200) {
                    setMccCodesAll(responseMccs.data);
                } else if (responseMccs.status === 401) {
                    localStorage.clear();
                    dispatch(editToken(""));

                    navigate(urls.LOGIN_URL);
                }
            } catch (err) {
                console.log(err);
            }
        };
        callForAllMccs();
    }, []);

    useEffect(() => {
        const callForMccPages = async () => {
            try {
                setShowLoading(true);
                const responseMccPage = await getDataApi(urls.MCC_PAGE_URL + `?page=${mccCodesCurrentPage}&size=${pageSize}`);
                setShowLoading(false);

                if (responseMccPage.status === 200) {
                    setMccCodes(addNumeration(responseMccPage.data.items, mccCodesCurrentPage, pageSize));
                    setMccCodesPageCount(responseMccPage.data.pages);
                    setMccCodesCurrentPage(responseMccPage.data.page);
                    setIsSearchedMccsData(false);
                } else if (responseMccPage.status === 401) {
                    localStorage.clear();
                    dispatch(editToken(""));

                    navigate(urls.LOGIN_URL);
                }
            } catch (err) {
                console.log(err);
            }
        };
        callForMccPages();
    }, [mccCodesCurrentPage, makeCallForMccPageData]);

    return (
        <div className="mccs-page-area">
            <div className="mccs-page-search-area">
                <MccCodesSearchArea setMccCodes={setMccCodes}
                                    mccCodesAll={mccCodesAll}
                                    makeCallForMccPageData={makeCallForMccPageData}
                                    setMakeCallForMccPageData={setMakeCallForMccPageData}
                                    pageSize={pageSize}
                                    setIsSearchedMccsData={setIsSearchedMccsData}
                                    setSearhedMccCodesPageCount={setSearhedMccCodesPageCount}
                                    searchedMccCodesCurrentPage={searchedMccCodesCurrentPage} />
            </div>
            <div className="mccs-page-content">
                <div className="mccs-page-table-area">
                    <Table whichTable={"mccs"}
                            datas={mccCodes}
                            scroll={false} />
                </div>
                <Pagination pageCount={isSearchedMccsData ? searhedMccCodesPageCount : mccCodesPageCount}
                            setPage={isSearchedMccsData ? setSearchedMccCodesCurrentPage : setMccCodesCurrentPage}
                            leftMargin={paginationLeftMarginClassname} />
            </div>
            
            {showLoading &&
                <Loader />
            }
        </div>
    );
};

export default MccCodesPage;