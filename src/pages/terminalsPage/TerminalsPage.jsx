import "./TerminalsPage.css";
import ChangeTerminalData from "./changeTerminalData/ChangeTerminalData";
import DeleteTerminalData from "./deleteTerminalData/DeleteTerminalData";
import TermPageSearchArea from "./termPageSearchArea/TermPageSearchArea";
import Table from "../../generalComponents/table/Table";
import ModalComponent from "../../generalComponents/modalComponent/ModalComponent";
import PaginationComponent from "../../generalComponents/pagination/Pagination";
import Loader from "../../generalComponents/loaders/Loader";
import { getDataApi } from "../../apis/getDataApi";
import { makeObjFieldsToString } from "../../utils/helpers/makeObjFieldsToString";
import { addNumeration } from "../../utils/helpers/addNumeration";
import { urls } from "../../constants/urls/urls";
import { paths } from "../../constants/paths/paths";
import { savePosModels } from "../../redux/slices/posModels/posModelsSlice";
import { savePaymentSystems } from "../../redux/slices/paymentSystems/paymentSystemsSlice";
import { saveCities } from "../../redux/slices/cities/citiesSlice";
import { saveMccs } from "../../redux/slices/mccs/mccsSlice";
import { editToken } from "../../redux/slices/authorization/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TerminalsPage = () => {
    const [ terminals, setTerminals ] = useState([]);
    const [ terminalsPageCount, setTerminalsPageCount ] = useState(1);
    const [ isTermDataChanged, setIsTermDataChanged ] = useState(false);
    const [ isTermDataDeleted, setIsTermDataDeleted ] = useState(false);
    const [ isTermDataSearched, setIsTermDataSearched ] = useState(false);
    const [ terminalsPage, setTerminalsPage ] = useState(1);
    const [ isSearchedTerminalsData, setIsSearchedTerminalsData ] = useState(false);    // For terminals search
    const [ terminalsPageForSearch, setTerminalsPageForSearch ] = useState(1);          // For terminals search
    const [ searchedTerminalsPageCount, setSearchedTerminalsPageCount ] = useState(1);  // For terminals search
    const [ selectedTerminal, setSelectedTerminal ] = useState({});
    const [ openCloseDeleteModal, setOpenCloseDeleteModal ] = useState(false);
    const [ openCloseEditModal, setOpenCloseEditModal ] = useState(false);
    const [ showLoading, setShowLoading ] = useState(false);
    const { isMenuOpen } = useSelector((state) => state.menu);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const windowHeight = window.screen.height;
    const pageSize = windowHeight < 950 ? 7 : 10;

    let paginationLeftMarginClassname = "";
    if (isMenuOpen) paginationLeftMarginClassname = "-open-menu";
    else paginationLeftMarginClassname = "-close-menu";

    useEffect(() => {
        const getCitiesMccPosModelsPaymentSystems = async () => {
            try {
                setShowLoading(true);
                const responseCities = await getDataApi(urls.CITIES_URL);
                const responseMcc = await getDataApi(urls.MCC_URL);
                const responsePosModels = await getDataApi(urls.POS_MODELS_URL);
                const responsePaymentSystems = await getDataApi(urls.PAY_SYS_URL);
                setShowLoading(false);

                if (responseCities.status === 200 &&
                    responseMcc.status === 200 &&
                    responsePosModels.status === 200 &&
                    responsePaymentSystems.status === 200
                ) {
                    dispatch(savePosModels(responsePosModels.data));
                    dispatch(savePaymentSystems(responsePaymentSystems.data));
                    dispatch(saveCities(responseCities.data));
                    dispatch(saveMccs(responseMcc.data));                    
                } else if (responseCities.status === 401 ||
                           responseMcc.status === 401 ||
                           responsePosModels.status === 401 ||
                           responsePaymentSystems.status === 401) {
                    localStorage.clear();
                    dispatch(editToken(""));
            
                    navigate(paths.LOGIN);
                } else {
                    throw Error("Terminals data error!");
                }
            } catch(err) {
                console.log("Error: ", err.message);
            }
        }
        getCitiesMccPosModelsPaymentSystems();
    }, []);

    useEffect(() => {
        try {
            const getTerminalsData = async () => {
                setShowLoading(true);
                const response = await getDataApi(
                    urls.TERMINALS_URL + `?page=${terminalsPage}&size=${pageSize}`
                );
                setShowLoading(false);

                if (response.status === 200) {
                    setTerminals(addNumeration(response.data.items, terminalsPage, pageSize));
                    setTerminalsPageCount(response.data.pages);
                    setIsSearchedTerminalsData(false);
                } else if (response.status === 401) {
                    localStorage.clear();
                    dispatch(editToken(""));
            
                    navigate(paths.LOGIN);
                } else {
                    throw new Error("Connection error!");
                }
            }
            getTerminalsData();
        } catch(err) {
            console.log("Error: ", err.message);
        }
    }, [isTermDataChanged, isTermDataDeleted, terminalsPage, isTermDataSearched]);

    return (
        <div className="terminals-page-area">
            <TermPageSearchArea pageSize={pageSize}
                                terminalsPageForSearch={terminalsPageForSearch}
                                setIsSearchedTerminalsData={setIsSearchedTerminalsData}
                                setSearchedTerminalsPageCount={setSearchedTerminalsPageCount}
                                setTerminals={setTerminals}
                                isSearched={isTermDataSearched}
                                setIsSearched={setIsTermDataSearched}
                                isTermDataChanged={isTermDataChanged}
                                setIsTermDataChanged={setIsTermDataChanged} 
            />
            <Table whichTable={"terminals"}
                   datas={makeObjFieldsToString(terminals)}
                   size="small"
                   windowHeight={windowHeight}
                   onClickEditButton={(terminal) => {
                       setSelectedTerminal(terminal);
                       setOpenCloseEditModal(true);
                   }}
                   onClickDeleteButton={(terminal) => {
                       setSelectedTerminal(terminal);
                       setOpenCloseDeleteModal(true);
                   }} />
            <div className={`terminals-page-pagination${paginationLeftMarginClassname}`}>
                <PaginationComponent pageCount={!isSearchedTerminalsData ? terminalsPageCount : searchedTerminalsPageCount}
                                     setPage={!isSearchedTerminalsData ? setTerminalsPage : setTerminalsPageForSearch} />
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
                                title={t("inactivateTerminalData.inactivateTerminalData")}
                                body={<DeleteTerminalData terminal={selectedTerminal}
                                setIsTermDataDeleted={setIsTermDataDeleted}
                                isTermDataDeleted={isTermDataDeleted}
                                onCloseHandler={() => setOpenCloseDeleteModal(false)} />}
                                />
                            }
            {showLoading &&
                <Loader />
            }
        </div>
    );
};

export default TerminalsPage;