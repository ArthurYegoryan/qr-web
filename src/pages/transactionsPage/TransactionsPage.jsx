import "./TransactionsPage.css";
import TransactionsTable from "./transactionsTable/TransactionsTable";
import getTransactionsByPage from "../../api/getTransactionsByPage";
import getTransactionTypes from "../../api/getTransactionTypes";
import ModalComponent from "../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import PaginationComponent from "../../generalComponents/pagination/Pagination";
import TransactionsSearchArea from "./transactionsSearchArea/TransactionsSearchArea";
import { urls } from "../../constants/urls/urls";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/authorization/authSlice";
import { transactionsTableFields } from "../../constants/tableFields/transactionsTableFields";

const TransactionsPage = () => {
    const [ transactions, setTransactions ] = useState([]);
    const [ transactionsPageCount, setTransactionsPageCount ] = useState(1);
    const [ transactionsPage, setTransactionsPage ] = useState(1);
    const [ transactionTypes, setTransactionTypes ] = useState([]);
    const [ openCloseModal, setOpenCloseModal ] = useState(false);
    const [ transactionsSearchInfo, setTransactionsSearchInfo ] = useState({
        hasSearchParams: false,
        searchField: "",
        searchValue: "",
        transactionType: "",
        startDate: "",
        startTime: "",        
        endDate: "",
        endTime: ""
    });
    const [ isTransactionDataSearched, setIsTransactionDataSearched ] = useState(false);
    const { isMenuOpen } = useSelector((state) => state.menu);
    const dispatch = useDispatch();

    let paginationLeftMarginClassname = "";
    if (isMenuOpen) paginationLeftMarginClassname = "-open-menu";
    else paginationLeftMarginClassname = "-close-menu";

    const searchFields = [];
    transactionsTableFields.map(field => {
        if (field.name !== "#") {
            searchFields.push(field.name);
        }        
    });

    useEffect(() => {
        try {
            const getTransactionsData = async () => {
                const response = await getTransactionsByPage(
                    urls.GET_TRANSACTIONS_BY_PAGE_URL, 
                    {
                        page: transactionsPage,
                        searchParams: transactionsSearchInfo 
                    }
                );

                if (response.message === "success") {
                    setTransactions(response.transactions);
                    setTransactionsPageCount(response.transactions_page_count);
                } else if (response.message === "expired token") {
                    localStorage.clear();
                    dispatch(logoutUser());
            
                    <Navigate to="/login" />;
                } else {
                    throw new Error("Connection error!");
                }                
            }
            getTransactionsData();
        } catch(err) {
            setOpenCloseModal(true);
        }
    }, [transactionsPage, isTransactionDataSearched]);

    useEffect(() => {
        try {
            const getTransactionTypesMethod = async () => {
                const response = await getTransactionTypes(urls.GET_TRANSACTION_TYPES_URL);

                if (response.message === "success") {
                    setTransactionTypes(response.transaction_types);
                } else if (response.message === "expired token") {
                    localStorage.clear();
                    dispatch(logoutUser());
            
                    <Navigate to="/login" />;
                } else {
                    throw new Error("Connection error!");
                }                
            }
            getTransactionTypesMethod();
        } catch(err) {
            setOpenCloseModal(true);
        }
    }, []);

    return (
        <div className="transactions-page-area">
            <TransactionsSearchArea isSearched={isTransactionDataSearched}
                                    setIsSearched={setIsTransactionDataSearched}
                                    searchFields={searchFields}
                                    transactionTypes={transactionTypes} 
                                    transactionsSearchInfo={transactionsSearchInfo}
                                    setTransactionsSearchInfo={setTransactionsSearchInfo} />
            <TransactionsTable transactions={transactions} />
            {openCloseModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseModal(false)} 
                                isOpen={openCloseModal} 
                                title="Connection error!"
                                body={<ErrorModalBody />}
                                bgcolor="red"
                />
            }
            <div className={`transactions-page-pagination${paginationLeftMarginClassname}`}>
                <PaginationComponent pageCount={transactionsPageCount}
                                     setPage={setTransactionsPage} />
            </div>
        </div>
    );
};

export default TransactionsPage;