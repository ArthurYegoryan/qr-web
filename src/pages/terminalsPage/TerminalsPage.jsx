import "./TerminalsPage.css";
import TerminalsTable from "./terminalsTable/TerminalsTable";
import { useDispatch, useSelector } from "react-redux";
import getTerminalsByPage from "../../api/getTerminalsByPage";
import { urls } from "../../constants/urls/urls";
import { Navigate, json } from "react-router-dom";
import { editToken, logoutUser } from "../../redux/slices/authorization/auth";
import { useEffect, useState } from "react";
import ModalComponent from "../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import TermPageSearchArea from "./termPageSearchArea/TermPageSearchArea";
import getTerminalsByParam from "../../api/getTerminalsByParam";
import PaginationComponent from "../../generalComponents/pagination/Pagination";

const TerminalsPage = () => {
    const [ terminals, setTerminals ] = useState([]);
    const [ terminalsPageCount, setTerminalsPageCount ] = useState(1);
    const [ openCloseModal, setOpenCloseModal ] = useState(false);
    const [ isTermDataChanged, setIsTermDataChanged ] = useState(false);
    const [ isTermDataDeleted, setIsTermDataDeleted ] = useState(false);
    const [ inputValue, setInputValue ] = useState("");
    const [ xForSearch, setXForSearch ] = useState(false);
    const { isMenuOpen } = useSelector((state) => state.menu);
    const [ terminalsPage, setTerminalsPage ] = useState(1);
    const dispatch = useDispatch();

    let paginationLeftMarginClassname = "";
    if (isMenuOpen) paginationLeftMarginClassname = "-open-menu";
    else paginationLeftMarginClassname = "-close-menu";

    useEffect(() => {
        try {
            const getTerminalsData = async () => {
                const response = await getTerminalsByPage(urls.GET_TERMINALS_BY_PAGE_URL, {page: terminalsPage});

                if (response.message === "success") {
                    setTerminals(response.terminals);
                    setTerminalsPageCount(response.terminals_page_count);
                } else if (response.message === "expired token") {
                    localStorage.clear();
                    dispatch(editToken(""));
                    dispatch(logoutUser());
            
                    <Navigate to="/login" />;
                } else {
                    throw new Error("Connection error!");
                }                
            }
            getTerminalsData();
        } catch(err) {
            setOpenCloseModal(true);
        }
    }, [isTermDataChanged, isTermDataDeleted, terminalsPage]);

    const searchHandler = async (evt) => {
        evt.preventDefault();

        try {
            const response = await getTerminalsByParam(urls.GET_TERMINALS_BY_PARAM, {param: inputValue});

            if (response.message === "success") {
                setTerminals(response.searched_terminals);
                setXForSearch(true);
            } else if (response.message === "expired token") {
                localStorage.clear();
                dispatch(editToken(""));
                dispatch(logoutUser());
        
                <Navigate to="/login" />;
            } else {
                throw new Error("Connection error!");
            }
        } catch (err) {
            setOpenCloseModal(true);
        }
    };

    const resetSearchHandler = async (evt) => {
        try {
            const response = await getTerminalsByPage(urls.GET_TERMINALS_BY_PAGE_URL, {page: terminalsPage});

            if (response.message === "success") {
                setTerminals(response.terminals);
                setXForSearch(false);
                setInputValue("");
            } else if (response.message === "expired token") {
                localStorage.clear();
                dispatch(editToken(""));
                dispatch(logoutUser());
        
                <Navigate to="/login" />;
            } else {
                throw new Error("Connection error!");
            }
        } catch (err) {
            setOpenCloseModal(true);
        }
    };

    return (
        <div className="terminals-page-area">
            <TermPageSearchArea searchHandler={searchHandler} 
                                setInputValue={setInputValue}
                                isSearched={xForSearch}
                                resetSearch={resetSearchHandler}
                                setIsTermDataChanged={setIsTermDataChanged} />
            <TerminalsTable terminals={terminals} 
                            setIsTermDataChanged={setIsTermDataChanged}
                            isTermDataChanged={isTermDataChanged} 
                            setIsTermDataDeleted={setIsTermDataDeleted}
                            isTermDataDeleted={isTermDataDeleted} />
            {openCloseModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseModal(false)} 
                                isOpen={openCloseModal} 
                                title="Connection error!"
                                body={<ErrorModalBody />}
                                bgcolor="red"
                />
            }
            <div className={`terminals-page-pagination${paginationLeftMarginClassname}`}>
                <PaginationComponent terminalsPageCount={terminalsPageCount}
                                     setTerminalsPage={setTerminalsPage} />
            </div>
        </div>
    );
};

export default TerminalsPage;