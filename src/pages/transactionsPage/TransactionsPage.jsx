import "./TransactionsPage.css";
import Table from "../../generalComponents/table/Table";
// import ModalComponent from "../../generalComponents/modalComponent/ModalComponent";
// import ErrorModalBody from "../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import PaginationComponent from "../../generalComponents/pagination/Pagination";
import TransactionsSearchArea from "./transactionsSearchArea/TransactionsSearchArea";
import Loader from "../../generalComponents/loaders/Loader";
import { getDataApi } from "../../apis/getDataApi";
import { transactionsSearchFields } from "../../constants/tableFields/transactionsSearchFields";
import { editToken } from "../../redux/slices/authorization/authSlice";
import { saveStatusCodes } from "../../redux/slices/statusCodes/statusCodesSlice";
import { saveTransactionTypes } from "../../redux/slices/transactionTypes/transactionTypesSlice";
import { urls } from "../../constants/urls/urls";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TransactionsPage = () => {
    const [ transactions, setTransactions ] = useState([]);
    const [ transactionsPageCount, setTransactionsPageCount ] = useState(1);
    const [ transactionsPage, setTransactionsPage ] = useState(1);
    const [ transactionTypes, setTransactionTypes ] = useState([]);
    const [ isSearchedTransactionsData, setIsSearchedTransactionsData ] = useState(false);    // For transactions search
    const [ transactionsPageForSearch, setTransactionsPageForSearch ] = useState(1);          // For transactions search
    const [ searchedTransactionsPageCount, setSearchedTransactionsPageCount ] = useState(1);  // For transactions search
    const [ isSearched, setIsSearched ] = useState(false);
    const [ showLoading, setShowLoading ] = useState(false);
    const { isMenuOpen } = useSelector((state) => state.menu);
    const dispatch = useDispatch();

    const windowHeight = window.screen.height;

    let paginationLeftMarginClassname = "";
    if (isMenuOpen) paginationLeftMarginClassname = "-open-menu";
    else paginationLeftMarginClassname = "-close-menu";

    useEffect(() => {
        try {
            const getTransactionsData = async () => {
                setShowLoading(true);
                const response = await getDataApi(urls.TRANSACTIONS_URL + `?page=${transactionsPage}&size=${(windowHeight < 950) ? 7 : 10}`);
                setShowLoading(false);

                if (response.status === 200) {
                    const transactions = response.data.items;
                    transactions.map((transaction) => {
                        const amount = String(transaction.amount);
                        transaction.amount = amount.slice(0, amount.length - 2) + "," + amount.slice(amount.length - 2);
                    })

                    setTransactions(transactions);
                    setTransactionsPageCount(response.data.pages);
                    setIsSearchedTransactionsData(false);
                } else if (response.status === 401) {
                    localStorage.clear();
                    dispatch(editToken(""));
            
                    window.location.reload();
                } else {
                    throw new Error("Connection error!");
                }                
            }
            getTransactionsData();
        } catch(err) {
            console.log(err.message);
        }
    }, [transactionsPage, isSearched]);

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
                    // setStatusCodes(responseStatusCodes.data);

                    dispatch(saveTransactionTypes(responseTransactionTypes.data));
                    dispatch(saveStatusCodes(responseStatusCodes.data));
                } else if (
                    responseTransactionTypes.status === 401 || 
                    responseStatusCodes.status === 401
                ) {
                    localStorage.clear();
                    dispatch(editToken(""));
            
                    window.location.reload();
                } else {
                    throw new Error("Connection error!");
                }                
            }
            getTransactionTypesStatusCodes();
        } catch(err) {
            console.log(err.message);
        }
    }, []);

    return (
        <div className="transactions-page-area">
            <TransactionsSearchArea windowHeight={windowHeight}
                                    transactionsPageForSearch={transactionsPageForSearch}
                                    setIsSearchedTransactionsData={setIsSearchedTransactionsData}
                                    setSearchedTransactionsPageCount={setSearchedTransactionsPageCount}
                                    setTransactions={setTransactions}
                                    isSearched={isSearched}
                                    setIsSearched={setIsSearched}
                                    transactionsSearchFields={transactionsSearchFields}
                                    transactionTypes={transactionTypes} />
            <Table whichTable={"transactions"}
                   datas={transactions}
                   windowHeight={windowHeight} />
            <div className={`transactions-page-pagination${paginationLeftMarginClassname}`}>
                <PaginationComponent pageCount={!isSearchedTransactionsData ? transactionsPageCount : searchedTransactionsPageCount}
                                     setPage={!isSearchedTransactionsData ? setTransactionsPage : setTransactionsPageForSearch} />
            </div>
            {showLoading &&
                <Loader />
            }
        </div>
    );
};

export default TransactionsPage;