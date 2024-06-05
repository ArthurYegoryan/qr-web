import "./TerminalsPage.css";
import TerminalsTable from "./terminalsTable/TerminalsTable";
import { useDispatch, useSelector } from "react-redux";
import getTerminalsByPage from "../../api/getTerminalsByPage";
import { urls } from "../../constants/urls/urls";
import { Navigate} from "react-router-dom";
import { logoutUser } from "../../redux/slices/authorization/auth";
import { useEffect, useState } from "react";
import ModalComponent from "../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import TermPageSearchArea from "./termPageSearchArea/TermPageSearchArea";
import PaginationComponent from "../../generalComponents/pagination/Pagination";
import { terminalsTableFieldsAdmin } from "../../constants/tableFields/terminalsTableFields";

const TerminalsPage = () => {
    const [ terminals, setTerminals ] = useState([]);
    const [ terminalsPageCount, setTerminalsPageCount ] = useState(1);
    const [ terminalsSearchInfo, setTerminalsSearchInfo ] = useState({
        searchField: "",
        searchValue: ""
    });
    const [ openCloseModal, setOpenCloseModal ] = useState(false);
    const [ isTermDataChanged, setIsTermDataChanged ] = useState(false);
    const [ isTermDataDeleted, setIsTermDataDeleted ] = useState(false);
    const [ isTermDataSearched, setIsTermDataSearched ] = useState(false);
    const { isMenuOpen } = useSelector((state) => state.menu);
    const [ terminalsPage, setTerminalsPage ] = useState(1);
    const dispatch = useDispatch();

    const searchFields = [];
    terminalsTableFieldsAdmin.map(field => {
        if (field.name !== "#") {
            searchFields.push(field.name);
        }
    });

    let paginationLeftMarginClassname = "";
    if (isMenuOpen) paginationLeftMarginClassname = "-open-menu";
    else paginationLeftMarginClassname = "-close-menu";

    useEffect(() => {
        try {
            const getTerminalsData = async () => {
                const response = await getTerminalsByPage(
                    urls.GET_TERMINALS_BY_PAGE_URL, 
                    {
                        page: terminalsPage,
                        searchParams: terminalsSearchInfo 
                    }
                );

                if (response.message === "success") {
                    setTerminals(response.terminals);
                    setTerminalsPageCount(response.terminals_page_count);
                } else if (response.message === "expired token") {
                    localStorage.clear();
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
    }, [isTermDataChanged, isTermDataDeleted, terminalsPage, isTermDataSearched]);

    return (
        <div className="terminals-page-area">
            <TermPageSearchArea searchFields={searchFields}
                                terminalsSearchInfo={terminalsSearchInfo} 
                                setTerminalsSearchInfo={setTerminalsSearchInfo}
                                isSearched={isTermDataSearched}
                                setIsSearched={setIsTermDataSearched}
                                isTermDataChanged={isTermDataChanged}
                                setIsTermDataChanged={setIsTermDataChanged} 
            />
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
                <PaginationComponent pageCount={terminalsPageCount}
                                     setPage={setTerminalsPage} />
            </div>
        </div>
    );
};

export default TerminalsPage;