import "./TransactionsSearchArea.css";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../generalComponents/inputFields/selectComponent/SelectComponent";
import Calendar from "../../../generalComponents/inputFields/calendarComponent/CalendarComponent";
import Button from "../../../generalComponents/buttons/Button";
import SearchIcon from '@mui/icons-material/Search';
import Time from "../../../generalComponents/inputFields/timeComponent/TimeComponent";
import Loader from "../../../generalComponents/loaders/Loader";
import { trxTypesDetector } from "../../../utils/helpers/trxtypesDetector";
import { searchingValidation } from "../../../utils/helpers/searchingValidation";
import { postDataApi } from "../../../apis/postDataApi";
import { urls } from "../../../constants/urls/urls";
import { editToken } from "../../../redux/slices/authorization/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';

const TransactionsSearchArea = ({ 
    isSearched,
    setIsSearched,
    transactionsSearchFields,
    transactionTypes, 
    setTransactions
    // transactionsSearchInfo, 
    // setTransactionsSearchInfo 
}) => {
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
    const [ showLoading, setShowLoading ] = useState(false);
    const [ prevSearchInfo, setPrevSearchInfo ] = useState({...transactionsSearchInfo});
    const [ searchByFieldEmptyError, setSearchByFieldEmptyError ] = useState(false);
    const [ searchDataFieldEmptyError, setSearchDataFieldEmptyError ] = useState(false);
    const dispatch = useDispatch();
    const { i18n, t } = useTranslation();

    // console.log("Transaction types: ", JSON.stringify(transactionTypes, null, 2));                    // Asel Vardanin name_ru lcni !!!
    const trxTypesList = [];
    transactionTypes.map((trxType) => {trxTypesList.push(trxType[`name_${i18n.language}`])});

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
                    transactionsSearchInfo.transactionType = trxTypesDetector[transactionsSearchInfo.transactionType];
                    transactionsSearchInfo.searchField = transactionsSearchFields[transactionsSearchInfo.searchField];

                    let searchParams = {};
                    for (const field in transactionsSearchInfo) {
                        if (field !== "hasSearchParams") {
                            searchParams[field] = transactionsSearchInfo[field];
                        }
                    }

                    const makeCallForSearchedTransactions = async () => {
                        try {
                            setShowLoading(true);
                            const response = await postDataApi(urls.SEARCH_TRANSACTIONS_URL, searchParams);
                            setShowLoading(false);

                            console.log("Response: ", response);

                            if (response.status === 200) {
                                setTransactions(response.data);
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
                                                searchField: evt.target.value
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
                                                transactionType: evt.target.value
                                            });
                                         }} />
                    </div>
                    <div className="transactions-search-calendar-fields">
                        <Calendar label={t("searchArea.startDate")}
                                  defaultDate={null}
                                  width="100px"
                                  fields={transactionsSearchInfo}
                                  setField={setTransactionsSearchInfo} 
                                  changeFieldName="startDate" />
                        <Time label={t("searchArea.startTime")}
                              width="100px"
                              fields={transactionsSearchInfo}
                              setField={setTransactionsSearchInfo} 
                              changeFieldName="startTime" />
                        <Calendar label={t("searchArea.endDate")}
                                  marginLeft="25px" 
                                  width="100px"
                                  fields={transactionsSearchInfo}
                                  setField={setTransactionsSearchInfo} 
                                  changeFieldName="endDate" />
                        <Time label={t("searchArea.endTime")}
                              width="100px"
                              fields={transactionsSearchInfo}
                              setField={setTransactionsSearchInfo} 
                              changeFieldName="endTime" />
                    </div>                    
                </div>
                <div className="transactions-search-buttons">
                    <Button label={t("searchArea.searchBtn")}
                            type="submit"
                            endIcon={<SearchIcon />}
                            marginRight="10px" />
                    <Button label={t("export.reporting")} />
                </div>
            </form>
            {showLoading &&
                <Loader />
            }
        </div>
    );
};

export default TransactionsSearchArea;