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
    // const [ statusCodes, setStatusCodes ] = useState([]);
    // const [ openCloseModal, setOpenCloseModal ] = useState(false);
    
    const [ isTransactionDataSearched, setIsTransactionDataSearched ] = useState(false);
    const [ showLoading, setShowLoading ] = useState(false);
    const { isMenuOpen } = useSelector((state) => state.menu);
    const dispatch = useDispatch();

    let paginationLeftMarginClassname = "";
    if (isMenuOpen) paginationLeftMarginClassname = "-open-menu";
    else paginationLeftMarginClassname = "-close-menu";

    useEffect(() => {
        try {
            const getTransactionsData = async () => {
                setShowLoading(true);
                const response = await getDataApi(urls.TRANSACTIONS_URL + `?page=${transactionsPage}&size=10`);
                setShowLoading(false);

                if (response.status === 200) {
                    const transactions = response.data.items;
                    transactions.map((transaction) => {
                        const amount = String(transaction.amount);
                        transaction.amount = amount.slice(0, amount.length - 2) + "," + amount.slice(amount.length - 2);
                    })

                    setTransactions(transactions);
                    setTransactionsPageCount(Math.ceil(response.data.total / response.data.size));
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
    }, [transactionsPage, isTransactionDataSearched]);

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
            {/* <TransactionsSearchArea isSearched={isTransactionDataSearched}
                                    setIsSearched={setIsTransactionDataSearched}
                                    transactionsSearchFields={transactionsSearchFields}
                                    transactionTypes={transactionTypes}
                                    setTransactions={setTransactions} /> */}
            <Table whichTable={"transactions"}
                   datas={transactions} />
            <div className={`transactions-page-pagination${paginationLeftMarginClassname}`}>
                <PaginationComponent pageCount={transactionsPageCount}
                                     setPage={setTransactionsPage} />
            </div>
            {showLoading &&
                <Loader />
            }
        </div>
    );
};

export default TransactionsPage;