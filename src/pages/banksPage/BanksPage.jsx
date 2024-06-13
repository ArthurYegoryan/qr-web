import "./BanksPage.css";
import BanksPageSearchArea from "./banksPageSearchArea/BanksPageSearchArea";
import ChangeBankData from "./changeBankData/ChangeBankData";
import Table from "../../generalComponents/table/Table";
import ModalComponent from "../../generalComponents/modalComponent/ModalComponent";
import PaginationComponent from "../../generalComponents/pagination/Pagination";
import ErrorModalBody from "../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import { banksSearchFields } from "../../constants/tableFields/banksSearchFields";
import getBanksByPage from "../../api/getBanksByPage";
import { urls } from "../../constants/urls/urls";
import { makeObjFieldsToString } from "../../utils/helpers/makeObjFieldsToString";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authorization/authSlice";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BanksPage = () => {
    const [ banks, setBanks ] = useState([]);
    const [ selectedBank, setSelectedBank ] = useState({});
    const [ banksSearchInfo, setBanksSearchInfo ] = useState({
        searchField: "",
        searchValue: ""
    });
    const [ isBanksDataChanged, setIsBanksDataChanged ] = useState(false);
    const [ isBanksDataDeleted, setIsBanksDataDeleted ] = useState(false);
    const [ isBanksDataSearched, setIsBanksDataSearched ] = useState(false);
    const [ banksPage, setBanksPage ] = useState(1);
    const [ banksPageCount, setBanksPageCount ] = useState(1);
    const [ openCloseModal, setOpenCloseModal ] = useState(false);
    const [ openCloseDeleteModal, setOpenCloseDeleteModal ] = useState(false);
    const [ openCloseEditModal, setOpenCloseEditModal ] = useState(false);
    const { isMenuOpen } = useSelector((state) => state.menu);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    let paginationLeftMarginClassname = "";
    if (isMenuOpen) paginationLeftMarginClassname = "-open-menu";
    else paginationLeftMarginClassname = "-close-menu";

    useEffect(() => {
        try {
            const getBanksData = async () => {
                const response = await getBanksByPage(
                    urls.getBanks,
                    {
                        page: banksPage,
                        searchParams: banksSearchInfo 
                    }
                );

                if (response.message === "success") {
                    setBanks(makeObjFieldsToString(response.banks));
                    setBanksPageCount(response.banks_page_count)
                } else if (response.message === "expired token") {
                    localStorage.clear();
                    dispatch(logoutUser());
            
                    <Navigate to="/login" />;
                } else {
                    throw new Error("Connection error!");
                }                
            }
            getBanksData();
        } catch(err) {
            setOpenCloseModal(true);
        }
    }, [isBanksDataChanged, isBanksDataDeleted, banksPage, isBanksDataSearched]);

    return (
        <div className="banks-content">
            <BanksPageSearchArea searchFields={banksSearchFields}
                                 banksSearchInfo={banksSearchInfo}
                                 setBanksSearchInfo={setBanksSearchInfo}
                                 isSearched={isBanksDataSearched}
                                 setIsSearched={setIsBanksDataSearched}
                                 isBankDataChanged={isBanksDataChanged}
                                 setIsBankDataChanged={setIsBanksDataChanged} />
            <div className="banks-table">
                <Table whichTable={"banks"}
                       datas={banks}
                       setCurrentData={setSelectedBank}
                       onClickEditButton={() => setOpenCloseEditModal(true)}
                       onClickDeleteButton={() => setOpenCloseDeleteModal(true)} />
            </div>
            <div className={`banks-page-pagination${paginationLeftMarginClassname}`}>
                <PaginationComponent pageCount={banksPageCount}
                                     setPage={setBanksPage} />
            </div>
            {openCloseModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseModal(false)} 
                                isOpen={openCloseModal} 
                                title="Connection error!"
                                body={<ErrorModalBody />}
                                bgcolor="red"
                />
            }
            {openCloseEditModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseEditModal(false)} 
                                isOpen={openCloseEditModal} 
                                title={t("banks.changeBankData")}
                                body={<ChangeBankData bank={selectedBank}
                                                      setIsBankDataChanged={setIsBanksDataChanged}
                                                      isBankDataChanged={isBanksDataChanged}
                                                      onCloseHandler={() => setOpenCloseEditModal(false)} />}
                />
            }
            {openCloseDeleteModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseDeleteModal(false)} 
                                isOpen={openCloseDeleteModal}
                                title={t("deleteTerminalData.deleteTerminalData")}
                                // body={<DeleteTerminalData terminal={selectedTerminal}
                                //                           setIsTermDataDeleted={setIsTermDataDeleted}
                                //                           isTermDataDeleted={isTermDataDeleted}
                                //                           onCloseHandler={() => setOpenCloseDeleteModal(false)} />}
                />
            }
        </div>
    );
};

export default BanksPage;