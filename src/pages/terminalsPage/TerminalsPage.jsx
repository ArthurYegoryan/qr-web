import "./TerminalsPage.css";
import Table from "../../generalComponents/table/Table";
import { useDispatch, useSelector } from "react-redux";
import getTerminalsByPage from "../../api/getTerminalsByPage";
import { urls } from "../../constants/urls/urls";
import { Navigate} from "react-router-dom";
import { logoutUser } from "../../redux/slices/authorization/authSlice";
import { useEffect, useState } from "react";
import ModalComponent from "../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import ChangeTerminalData from "./changeTerminalData/ChangeTerminalData";
import DeleteTerminalData from "./deleteTerminalData/DeleteTerminalData";
import TermPageSearchArea from "./termPageSearchArea/TermPageSearchArea";
import PaginationComponent from "../../generalComponents/pagination/Pagination";
import { terminalsTableFieldsAdmin } from "../../constants/tableFields/terminalsTableFields";
import { useTranslation } from "react-i18next";

const TerminalsPage = () => {
    const [ terminals, setTerminals ] = useState([]);
    const [ terminalsPageCount, setTerminalsPageCount ] = useState(1);
    const [ terminalsSearchInfo, setTerminalsSearchInfo ] = useState({
        searchField: "",
        searchValue: ""
    });
    const [ openCloseModal, setOpenCloseModal ] = useState(false);
    const [ openCloseDeleteModal, setOpenCloseDeleteModal ] = useState(false);
    const [ openCloseEditModal, setOpenCloseEditModal ] = useState(false);
    const [ isTermDataChanged, setIsTermDataChanged ] = useState(false);
    const [ isTermDataDeleted, setIsTermDataDeleted ] = useState(false);
    const [ isTermDataSearched, setIsTermDataSearched ] = useState(false);
    const { isMenuOpen } = useSelector((state) => state.menu);
    const [ terminalsPage, setTerminalsPage ] = useState(1);
    const [ selectedTerminal, setSelectedTerminal ] = useState({});
    const { t } = useTranslation();
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
            <Table whichTable={"terminals"}
                   datas={terminals}
                   onClickEditButton={(terminal) => {
                       setSelectedTerminal(terminal);
                       setOpenCloseEditModal(true);
                   }}
                   onClickDeleteButton={(terminal) => {
                       setSelectedTerminal(terminal);
                       setOpenCloseDeleteModal(true);
                   }} />
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
            {openCloseEditModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseEditModal(false)} 
                                isOpen={openCloseEditModal} 
                                title={t("changeTerminalData.changeTerminalData")}
                                body={<ChangeTerminalData terminal={selectedTerminal}
                                                          setIsTermDataChanged={setIsTermDataChanged}
                                                          isTermDataChanged={isTermDataChanged}
                                                          onCloseHandler={() => setOpenCloseEditModal(false)} />}
                />
            }
            {openCloseDeleteModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseDeleteModal(false)} 
                                isOpen={openCloseDeleteModal}
                                title={t("deleteTerminalData.deleteTerminalData")}
                                body={<DeleteTerminalData terminal={selectedTerminal}
                                                          setIsTermDataDeleted={setIsTermDataDeleted}
                                                          isTermDataDeleted={isTermDataDeleted}
                                                          onCloseHandler={() => setOpenCloseDeleteModal(false)} />}
                />
            }
        </div>
    );
};

export default TerminalsPage;