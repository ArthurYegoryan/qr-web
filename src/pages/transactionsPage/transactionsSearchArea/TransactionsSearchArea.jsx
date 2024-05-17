import "./TransactionsSearchArea.css";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../generalComponents/inputFields/selectComponent/SelectComponent";
import Calendar from "../../../generalComponents/inputFields/calendarComponent/CalendarComponent";
import Button from "../../../generalComponents/buttons/Button";
import SearchIcon from '@mui/icons-material/Search';
import Time from "../../../generalComponents/inputFields/timeComponent/TimeComponent";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { searchingValidation } from "../../../utils/helpers/searchingValidation";

const TransactionsSearchArea = ({ 
    isSearched,
    setIsSearched,
    searchFields,
    transactionTypes, 
    transactionsSearchInfo, 
    setTransactionsSearchInfo 
}) => {
    const [ prevSearchInfo, setPrevSearchInfo ] = useState({...transactionsSearchInfo});
    const [ searchByFieldEmptyError, setSearchByFieldEmptyError ] = useState(false);
    const [ searchDataFieldEmptyError, setSearchDataFieldEmptyError ] = useState(false);
    const { t } = useTranslation();

    return (
        <div className="transactions-search-area">
            <form className="transactions-search-form" onSubmit={(evt) => {
                evt.preventDefault();

                searchingValidation(
                    transactionsSearchInfo,
                    setTransactionsSearchInfo,
                    prevSearchInfo,
                    setPrevSearchInfo,
                    isSearched,
                    setIsSearched,
                    setSearchDataFieldEmptyError,
                    setSearchByFieldEmptyError
                );
            }}>
                <div className="transactions-search-inputs">
                    <div className="transactions-search-input-fields">
                        <SelectComponent label={t("searchArea.searchBy")}
                                         chooseData={searchFields} 
                                         fields={transactionsSearchInfo}
                                         changeFieldName="searchField"
                                         setField={setTransactionsSearchInfo}
                                         hasFirstRow={true}
                                         firstRowLabel="------"
                                         firstRowValue=""
                                         width="150px"
                                         marginTop={"36px"}
                                         existsError={searchByFieldEmptyError}
                                         errorText={t("searchArea.emptyFieldError")} 
                                         onChooseHandler={() => setSearchByFieldEmptyError(false)}/>
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
                                         chooseData={transactionTypes}
                                         chooseDataValue="name_en"
                                         fields={transactionsSearchInfo}
                                         changeFieldName="transactionType"
                                         setField={setTransactionsSearchInfo}
                                         width={250}
                                         marginTop={"36px"}
                                         marginLeft={"10px"} />
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
        </div>
    );
};

export default TransactionsSearchArea;