import "./TerminalsPage.css";
import ChangeTerminalData from "./changeTerminalData/ChangeTerminalData";
import DeleteTerminalData from "./deleteTerminalData/DeleteTerminalData";
import TermPageSearchArea from "./termPageSearchArea/TermPageSearchArea";
import Table from "../../generalComponents/table/Table";
import ModalComponent from "../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import PaginationComponent from "../../generalComponents/pagination/Pagination";
import getTerminalsByPage from "../../api/getTerminalsByPage";
import getTerminalsTypes from "../../api/getTerminalsTypes";
import getAllBanks from "../../api/getAllBanks";
import getPaymentSystems from "../../api/getPaymentSystems";
import { saveBanksAllData, saveBanks } from "../../redux/slices/banks/banksSlice";
import { saveTerminalTypes } from "../../redux/slices/terminalTypes/terminalTypesSlice";
import { savePaymentSystems } from "../../redux/slices/paymentSystems/paymentSystemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { urls } from "../../constants/urls/urls";
import { Navigate} from "react-router-dom";
import { editToken } from "../../redux/slices/authorization/authSlice";
import { useEffect, useState } from "react";
import { terminalsSearchFields } from "../../constants/tableFields/terminalsSearchFields";
import { useTranslation } from "react-i18next";
import { makeObjFieldsToString } from "../../utils/helpers/makeObjFieldsToString";

const TerminalsPage = () => {
    const [ terminals, setTerminals ] = useState([]);
    const [ terminalsPageCount, setTerminalsPageCount ] = useState(1);
    const [ terminalsSearchInfo, setTerminalsSearchInfo ] = useState({
        searchField: "",
        searchValue: "",
        hasSearchParams: false
    });
    const [ isTermDataChanged, setIsTermDataChanged ] = useState(false);
    const [ isTermDataDeleted, setIsTermDataDeleted ] = useState(false);
    const [ isTermDataSearched, setIsTermDataSearched ] = useState(false);
    const [ terminalsPage, setTerminalsPage ] = useState(1);
    const [ selectedTerminal, setSelectedTerminal ] = useState({});
    const [ openCloseDeleteModal, setOpenCloseDeleteModal ] = useState(false);
    const [ openCloseEditModal, setOpenCloseEditModal ] = useState(false);
    const [ openCloseErrorModal, setOpenCloseErrorModal ] = useState(false);
    const { isMenuOpen } = useSelector((state) => state.menu);
    const userId = useSelector((state) => state.auth.id.payload) ?? localStorage.getItem("user_id");
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let paginationLeftMarginClassname = "";
    if (isMenuOpen) paginationLeftMarginClassname = "-open-menu";
    else paginationLeftMarginClassname = "-close-menu";

    useEffect(() => {
        try {
            const getTerminalsData = async () => {
                let searchInfo = {};
                
                if (terminalsSearchInfo.hasSearchParams) { 
                    searchInfo = {
                        ...terminalsSearchInfo,
                        "searchField": terminalsSearchFields[terminalsSearchInfo.searchField]
                    }
                }

                const response = await getTerminalsByPage(
                    urls.GET_TERMINALS_BY_PAGE_URL, 
                    {
                        user_id: userId,
                        page: terminalsPage,
                        searchParams: terminalsSearchInfo 
                    }
                );

                if (response.message === "success") {
                    setTerminals(response.terminals);
                    setTerminalsPageCount(response.terminals_page_count);
                } else if (response.message === "expired token") {
                    localStorage.clear();
                    dispatch(editToken(""));
            
                    <Navigate to="/login" />;
                } else {
                    throw new Error("Connection error!");
                }
            }
            getTerminalsData();
        } catch(err) {
            setOpenCloseErrorModal(true);
        }
    }, [isTermDataChanged, isTermDataDeleted, terminalsPage, isTermDataSearched]);

    useEffect(() => {
        const fetchTerminalsTypesBanksPaysys = async () => {
            try {
                const responseTermTypes = await getTerminalsTypes(urls.GET_TERMINALS_TYPES_URL);
                const responseBanks = await getAllBanks(urls.GET_BANKS_URL);
                const responsePaySystems = await getPaymentSystems(urls.GET_PAYMENT_SYSTEMS_URL);

                if (responseTermTypes.message === "success" &&
                    responseBanks.message === "success" &&
                    responsePaySystems.message === "success") {
                    
                    dispatch(saveBanksAllData(responseBanks.banks));

                    const banks = {};
                    responseBanks.banks.map((bank) => {
                        banks[bank.id] = bank.short_name;
                    });

                    dispatch(saveBanks(banks));
                    dispatch(saveTerminalTypes(responseTermTypes.terminalsTypes));
                    dispatch(savePaymentSystems(responsePaySystems.paymentSystems));
                    
                } else if (responseTermTypes.message === "invalid token" ||
                           responseBanks.message === "invalid token" ||
                           responsePaySystems.message === "invalid token") {
                    localStorage.clear();
                    dispatch(editToken(""));
            
                    <Navigate to="/login" />;
                } else {
                    throw Error("Terminals data error!");
                }
            } catch(err) {
                setOpenCloseErrorModal(true);
            }
        }
        fetchTerminalsTypesBanksPaysys();
    }, []);

    return (
        <div className="terminals-page-area">
            <TermPageSearchArea searchFields={Object.keys(terminalsSearchFields)}
                                terminalsSearchInfo={terminalsSearchInfo} 
                                setTerminalsSearchInfo={setTerminalsSearchInfo}
                                isSearched={isTermDataSearched}
                                setIsSearched={setIsTermDataSearched}
                                isTermDataChanged={isTermDataChanged}
                                setIsTermDataChanged={setIsTermDataChanged} 
            />
            <Table whichTable={"terminals"}
                   datas={makeObjFieldsToString(terminals)}
                   onClickEditButton={(terminal) => {
                       setSelectedTerminal(terminal);
                       setOpenCloseEditModal(true);
                   }}
                   onClickDeleteButton={(terminal) => {
                       setSelectedTerminal(terminal);
                       setOpenCloseDeleteModal(true);
                   }} />
            {openCloseErrorModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseErrorModal(false)} 
                                isOpen={openCloseErrorModal} 
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