import "./TransactionsSearchArea.css";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../generalComponents/inputFields/selectComponent/SelectComponent";
import Button from "../../../generalComponents/buttons/Button";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import WillBeSoonModalBody from "../../../generalComponents/modalComponent/willBeSoonModalBody/WillBeSoonModalBody";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../../generalComponents/loaders/Loader";
import SearchIcon from '@mui/icons-material/Search';
import { trxTypesDetector } from "../../../utils/helpers/trxtypesDetector";
import { searchingValidation } from "../../../utils/helpers/searchingValidation";
import { postDataApi } from "../../../apis/postDataApi";
import { urls } from "../../../constants/urls/urls";
import { editToken } from "../../../redux/slices/authorization/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';

const TransactionsSearchArea = ({ 
    windowHeight,
    transactionsPageForSearch,
    setIsSearchedTransactionsData,
    setSearchedTransactionsPageCount,
    isSearched,
    setIsSearched,
    transactionsSearchFields,
    transactionTypes, 
    setTransactions
}) => {
    const [ transactionsSearchInfo, setTransactionsSearchInfo ] = useState({
        hasSearchParams: false,
        searchField: null,
        searchValue: null,
        transactionType_id: null,
        startDate: new Date(Date.now() - 604800000),
        endDate: new Date(Date.now()),
    });
    const [ currentSearchPage, setCurrentSearchPage ] = useState(1);
    const [ showLoading, setShowLoading ] = useState(false);
    const [ prevSearchInfo, setPrevSearchInfo ] = useState({
        ...transactionsSearchInfo,
        startDate: null,
        endDate: null
    });
    const [ searchByFieldEmptyError, setSearchByFieldEmptyError ] = useState(false);
    const [ searchDataFieldEmptyError, setSearchDataFieldEmptyError ] = useState(false);
    const [ openCloseWillBeSoonModal, setOpenCloseWillBeSoonModal ] = useState(false);
    const dispatch = useDispatch();
    const { i18n, t } = useTranslation();

    // console.log("Transaction types: ", JSON.stringify(transactionTypes, null, 2));                    // Asel Vardanin name_ru lcni !!!
    const trxTypesList = [];
    transactionTypes.map((trxType) => {trxTypesList.push(trxType[`name_${i18n.language}`])});

    const callForTransactionsSearchedData = () => {
        let searchParams = {};
        for (const field in transactionsSearchInfo) {
            if (field !== "hasSearchParams") {
                searchParams[field] = transactionsSearchInfo[field];
            }
        }

        const makeCallForSearchedTransactions = async () => {
            try {
                setShowLoading(true);
                const response = await postDataApi(urls.SEARCH_TRANSACTIONS_URL 
                                            + `?page=${transactionsPageForSearch}&size=${(windowHeight < 950) ? 7 : 10}`, searchParams);
                setShowLoading(false);

                console.log("Response: ", response);

                if (response.status === 200) {
                    setTransactions(response.data.items);
                    setIsSearchedTransactionsData(true);
                    setSearchedTransactionsPageCount(response.data.pages);
                    setCurrentSearchPage(response.data.page);
                } else if (response.status === 401) {
                    dispatch(editToken(""));
                    localStorage.clear();

                    window.location.reload()
                }
            } catch (err) {
                console.log("Error: ", err);
            }
        };
        makeCallForSearchedTransactions();
    };

    if (transactionsPageForSearch !== currentSearchPage) {
        setCurrentSearchPage(transactionsPageForSearch);
        callForTransactionsSearchedData();
    }

    return (
        <div className="transactions-search-area">
            <form className="transactions-search-form" onSubmit={(evt) => {
                evt.preventDefault();

                const makeSearchCall = searchingValidation(
                    transactionsSearchInfo,
                    setTransactionsSearchInfo,
                    prevSearchInfo,
                    setPrevSearchInfo,
                    isSearched,
                    setIsSearched,
                    setSearchDataFieldEmptyError,
                    setSearchByFieldEmptyError
                );

                if (makeSearchCall) {
                    callForTransactionsSearchedData();
                }
            }}>
                <div className="transactions-search-inputs">
                    <div className="transactions-search-input-fields">
                        <SelectComponent label={t("searchArea.searchBy")}
                                         chooseData={Object.keys(transactionsSearchFields)} 
                                         hasFirstRow={true}
                                         firstRowLabel="------"
                                         firstRowValue=""
                                         width="150px"
                                         marginTop={"36px"}
                                         existsError={searchByFieldEmptyError}
                                         errorText={t("searchArea.emptyFieldError")} 
                                         onChooseHandler={(evt) => {
                                            setSearchByFieldEmptyError(false);
                                            setTransactionsSearchInfo({
                                                ...transactionsSearchInfo,
                                                searchField: transactionsSearchFields[evt.target.value]
                                            });
                                        }}/>
                        <TextInput label={t("searchArea.searchData")}
                                   existsError={searchDataFieldEmptyError}
                                   errorText={t("searchArea.emptyFieldError")}
                                   onChangeHandler={(evt) => {
                                       setSearchDataFieldEmptyError(false);
                                       setTransactionsSearchInfo({ 
                                           ...transactionsSearchInfo,
                                           searchValue: (evt.target.value)
                                       })
                                   }}
                                   marginTop={"36px"} />
                        <SelectComponent label={t("searchArea.chooseTrxType")}
                                         hasFirstRow={true}
                                         firstRowLabel={t("------")}
                                         firstRowValue=""
                                         chooseData={trxTypesList}
                                         width={"250px"}
                                         marginTop={"36px"}
                                         marginLeft={"10px"}
                                         onChooseHandler={(evt) => {
                                            setTransactionsSearchInfo({
                                                ...transactionsSearchInfo,
                                                transactionType_id: trxTypesDetector[evt.target.value]
                                            });
                                         }} />
                    </div>
                    <div className="transactions-search-calendar-fields">
                        <div className="transactions-search-date">
                            <span>{t("searchArea.startDate")}</span>
                            <DatePicker dateFormat="dd-MM-yyyy HH:mm"
                                        timeFormat="HH:mm"
                                        isClearable
                                        showIcon
                                        showTimeSelect
                                        timeIntervals={15}
                                        minDate={"06.01.2024"}
                                        maxDate={Date.now()}
                                        showYearDropdown
                                        selected={transactionsSearchInfo.startDate}
                                        onChange={(date) => setTransactionsSearchInfo({
                                            ...transactionsSearchInfo,
                                            startDate: date
                                        })} />
                        </div>
                        <div className="transactions-search-date">
                            <span>{t("searchArea.endDate")}</span>
                            <DatePicker dateFormat="dd-MM-yyyy HH:mm"
                                        timeFormat="HH:mm"
                                        isClearable
                                        showIcon
                                        showTimeSelect
                                        timeIntervals={15}
                                        minDate={"06.01.2024"}
                                        maxDate={Date.now()}
                                        showYearDropdown
                                        selected={transactionsSearchInfo.endDate}
                                        onChange={(date) => setTransactionsSearchInfo({
                                            ...transactionsSearchInfo,
                                            endDate: date
                                        })} />
                        </div>
                    </div>                    
                </div>
                <div className="transactions-search-buttons">
                    <Button label={t("searchArea.searchBtn")}
                            type="submit"
                            endIcon={<SearchIcon />}
                            marginRight="10px" />
                    <Button label={t("export.reporting")}
                            onClickHandler={() => setOpenCloseWillBeSoonModal(true)} />
                </div>
            </form>
            {openCloseWillBeSoonModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseWillBeSoonModal(false)} 
                                isOpen={openCloseWillBeSoonModal} 
                                title={t("export.reporting")}
                                body={<WillBeSoonModalBody onCloseHandler={() => setOpenCloseWillBeSoonModal(false)} />} />      
            }
            {showLoading &&
                <Loader />
            }
        </div>
    );
};

export default TransactionsSearchArea;