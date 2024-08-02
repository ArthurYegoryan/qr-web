import "./MccCodesPage.css";
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
    const [ mccCodes, setMccCodes ] = useState([]);
    const [ mccCodesPageCount, setMccCodesPageCount ] = useState(1);
    const [ mccCodesCurrentPage, setMccCodesCurrentPage ] = useState(1);
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
        const callForMccPages = async () => {
            try {
                setShowLoading(true);
                const response = await getDataApi(urls.MCC_PAGE_URL + `?page=1&size=10`);
                setShowLoading(false);

                if (response.status === 200) {
                    setMccCodes(addNumeration(response.data.items, mccCodesCurrentPage, pageSize));
                    setMccCodesPageCount(response.data.pages);
                    setMccCodesCurrentPage(response.data.page);
                } else if (response.status === 401) {
                    localStorage.clear();
                    dispatch(editToken(""));

                    navigate(urls.LOGIN_URL);
                }
            } catch (err) {
                console.log(err);
            }
        };
        callForMccPages();
    }, [mccCodesCurrentPage]);

    return (
        <div className="mccs-page-area">
            <div className="mccs-page-table-area">
                <Table whichTable={"mccs"}
                       datas={mccCodes} />
            </div>
            <Pagination pageCount={mccCodesPageCount}
                        setPage={setMccCodesCurrentPage}
                        leftMargin={paginationLeftMarginClassname} />
            {showLoading &&
                <Loader />
            }
        </div>
    );
};

export default MccCodesPage;