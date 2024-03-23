import "./TransactionsPage.css";
import TransactionsTable from "./transactionsTable/TransactionsTable";
import getTransactionsByPage from "../../api/getTransactionsByPage";
import ModalComponent from "../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import PaginationComponent from "../../generalComponents/pagination/Pagination";
import { urls } from "../../constants/urls/urls";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { editToken, logoutUser } from "../../redux/slices/authorization/auth";

const TransactionsPage = () => {
    const [ transactions, setTransactions ] = useState([]);
    const [ transactionsPageCount, setTransactionsPageCount ] = useState(1);
    const [ transactionsPage, setTransactionsPage ] = useState(1);
    const [ openCloseModal, setOpenCloseModal ] = useState(false);
    const { isMenuOpen } = useSelector((state) => state.menu);
    const dispatch = useDispatch();

    let paginationLeftMarginClassname = "";
    if (isMenuOpen) paginationLeftMarginClassname = "-open-menu";
    else paginationLeftMarginClassname = "-close-menu";

    useEffect(() => {
        try {
            const getTransactionsData = async () => {
                const response = await getTransactionsByPage(urls.GET_TRANSACTIONS_BY_PAGE_URL, {page: transactionsPage});

                if (response.message === "success") {
                    setTransactions(response.transactions);
                    setTransactionsPageCount(response.transactions_page_count);
                } else if (response.message === "expired token") {
                    localStorage.clear();
                    dispatch(editToken(""));
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
    }, []);

    return (
        <div className="transactions-page-area">
            <h1>
                Transactions Page
            </h1>
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