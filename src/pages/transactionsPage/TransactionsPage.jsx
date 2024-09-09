import "./TransactionsPage.css";
import Table from "../../generalComponents/table/Table";
import PaginationComponent from "../../generalComponents/pagination/Pagination";
import TransactionsSearchArea from "./transactionsSearchArea/TransactionsSearchArea";
import Loader from "../../generalComponents/loaders/Loader";
import { getDataApi } from "../../apis/getDataApi";
import { refreshTokenMakeCall } from "../../utils/helpers/refreshTokenMakeCall";
import { transactionsSearchFields } from "../../constants/tableFields/transactionsSearchFields";
import { changeTransactionsFieldsForView } from "../../utils/helpers/changeTransactionsFieldsForView";
import { editToken } from "../../redux/slices/authorization/authSlice";
import { saveStatusCodes } from "../../redux/slices/statusCodes/statusCodesSlice";
import { saveTransactionTypes } from "../../redux/slices/transactionTypes/transactionTypesSlice";
import { paths } from "../../constants/paths/paths";
import { urls } from "../../constants/urls/urls";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TransactionsPage = () => {
    const [ transactionsSortFields, setTransactionsSortFields ] = useState({
        order_by: null,
        desc: true,
    });
    const [ transactions, setTransactions ] = useState([]);
    const [ transactionsPageCount, setTransactionsPageCount ] = useState(1);
    const [ transactionsPage, setTransactionsPage ] = useState(1);
    const [ transactionTypes, setTransactionTypes ] = useState([]);
    const [ statusCodes, setStatusCodes ] = useState([]);
    const [ isSearchedTransactionsData, setIsSearchedTransactionsData ] = useState(false);    // For transactions search
    const [ transactionsPageForSearch, setTransactionsPageForSearch ] = useState(1);          // For transactions search
    const [ searchedTransactionsPageCount, setSearchedTransactionsPageCount ] = useState(1);  // For transactions search
    const [ isSearched, setIsSearched ] = useState(false);
    const [ makeCallForTransactions, setMakeCallForTransactions ] = useState(false);
    const [ showLoading, setShowLoading ] = useState(false);
    const { isMenuOpen } = useSelector((state) => state.menu);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const windowHeight = window.screen.height;
    const pageSize = windowHeight < 950 ? 8 : 10;

    let paginationLeftMarginClassname = "";
    if (isMenuOpen) paginationLeftMarginClassname = "-open-menu";
    else paginationLeftMarginClassname = "-close-menu";

    useEffect(() => {
        if (!isSearchedTransactionsData && transactionsPage === 1) {
            const interval = setInterval(() => {
                setMakeCallForTransactions(!makeCallForTransactions);
            }, 60000);

            return () => clearInterval(interval);
        }
    }, [isSearchedTransactionsData, makeCallForTransactions]);

    useEffect(() => {
        try {
            const getTransactionsData = async () => {
                setShowLoading(true);
                const response = await getDataApi(urls.TRANSACTIONS_URL + `?page=${transactionsPage}&size=${pageSize}`);
                setShowLoading(false);

                if (response.status === 200) {
                    setTransactions(changeTransactionsFieldsForView(response.data.items, transactionsPage, pageSize, transactionsSortFields.desc, response.data.total));
                    setTransactionsPageCount(response.data.pages);
                    setIsSearchedTransactionsData(false);
                } else if (response.status === 401) {
                    const response = await refreshTokenMakeCall(setShowLoading, [ getDataApi ], [urls.TRANSACTIONS_URL + `?page=${transactionsPage}&size=${pageSize}`]);

                    if (response.callsResponses.length) {
                        dispatch(editToken(response.responseRefreshToken.data.access_token));
                        localStorage.setItem("token", response.responseRefreshToken.data.access_token);

                        if (response.callsResponses[0].status === 200) {
                            setTransactions(changeTransactionsFieldsForView(response.callsResponses[0].data.items, transactionsPage, pageSize));
                            setTransactionsPageCount(response.callsResponses[0].data.pages);
                            setIsSearchedTransactionsData(false);
                        } else if (response.callsResponses[0].status === 401) {
                            localStorage.clear();
                            dispatch(editToken(""));
                    
                            navigate(paths.LOGIN);
                        }
                    }
                } else {
                    throw new Error("Connection error!");
                }                
            }
            getTransactionsData();
        } catch(err) {
            console.log(err.message);
        }
    }, [transactionsPage, isSearched, makeCallForTransactions]);

    useEffect(() => {
        try {
            const getTransactionTypesStatusCodes = async () => {
                setShowLoading(true);
                const responseTransactionTypes = await getDataApi(urls.TRANSACTION_TYPES_URL);
                const responseStatusCodes = await getDataApi(urls.STATUS_CODES_URL);
                setShowLoading(false);

                if (
                    responseTransactionTypes.status === 200 &&
                    responseStatusCodes.status === 200
                ) {
                    setTransactionTypes(responseTransactionTypes.data);
                    setStatusCodes(responseStatusCodes.data);

                    dispatch(saveTransactionTypes(responseTransactionTypes.data));
                    dispatch(saveStatusCodes(responseStatusCodes.data));
                } else if (
                    responseTransactionTypes.status === 401 || 
                    responseStatusCodes.status === 401
                ) {
                    const response = await refreshTokenMakeCall(
                        setShowLoading, 
                        [ getDataApi, getDataApi ], 
                        [urls.TRANSACTION_TYPES_URL, urls.STATUS_CODES_URL]);

                    if (response.callsResponses.length) {
                        dispatch(editToken(response.responseRefreshToken.data.access_token));
                        localStorage.setItem("token", response.responseRefreshToken.data.access_token);

                        let allCallsIsOK = true;

                        response.callsResponses.map((callResponse) => {
                            if (callResponse.status !== 200) allCallsIsOK = false;
                        });

                        if (allCallsIsOK) {
                            setTransactionTypes(response.callsResponses[0].data);
                            setStatusCodes(response.callsResponses[1].data);

                            dispatch(saveTransactionTypes(response.callsResponses[0].data));
                            dispatch(saveStatusCodes(response.callsResponses[1].data));
                        } else {
                            localStorage.clear();
                            dispatch(editToken(""));
                    
                            navigate(paths.LOGIN);
                        }
                    }
                } else {
                    throw new Error("Connection error!");
                }                
            }
            getTransactionTypesStatusCodes();
        } catch(err) {
            console.log(err.message);
        }
    }, []);

    const filterHandlers = {
        byId: () => {
            setTransactionsSortFields({
                order_by: "id",
                desc: transactionsSortFields.desc === true ? false : true,
            });
        },
        byTerminalId: () => {
            setTransactionsSortFields({
                order_by: "terminalId",
                desc: transactionsSortFields.desc === true ? false : true,
            });
        },
        byMerchantId: () => {
            setTransactionsSortFields({
                order_by: "merchantId",
                desc: transactionsSortFields.desc === true ? false : true,
            });
        },
        byRrn: () => {
            setTransactionsSortFields({
                order_by: "rrn",
                desc: transactionsSortFields.desc === true ? false : true,
            });
        },
        byAmount: () => {
            setTransactionsSortFields({
                order_by: "amount",
                desc: transactionsSortFields.desc === true ? false : true,
            });
        }
    }

    return (
        <div className="transactions-page-area">
            <TransactionsSearchArea pageSize={pageSize}
                                    transactionsPageForSearch={transactionsPageForSearch}
                                    setIsSearchedTransactionsData={setIsSearchedTransactionsData}
                                    setSearchedTransactionsPageCount={setSearchedTransactionsPageCount}
                                    setTransactions={setTransactions}
                                    isSearched={isSearched}
                                    setIsSearched={setIsSearched}
                                    transactionsSearchFields={transactionsSearchFields}
                                    transactionsSortFields={transactionsSortFields}
                                    transactionTypes={transactionTypes}
                                    statusCodes={statusCodes} />
            <Table whichTable={"transactions"}
                   datas={transactions}
                   size="small"
                   windowHeight={windowHeight}
                   minWidth={"1400px"}
                   scrollX={true}
                   filterHandlers={filterHandlers} />
            <div className={`transactions-page-pagination`}>
                <PaginationComponent pageCount={!isSearchedTransactionsData ? transactionsPageCount : searchedTransactionsPageCount}
                                     setPage={!isSearchedTransactionsData ? setTransactionsPage : setTransactionsPageForSearch}
                                     leftMargin={paginationLeftMarginClassname} />
            </div>
            {showLoading &&
                <Loader />
            }
        </div>
    );
};

export default TransactionsPage;