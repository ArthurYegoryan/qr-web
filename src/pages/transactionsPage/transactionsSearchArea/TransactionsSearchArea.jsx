import "./TransactionsSearchArea.css";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../generalComponents/inputFields/selectComponent/SelectComponent";
import Calendar from "../../../generalComponents/inputFields/calendarComponent/CalendarComponent";
import Button from "../../../generalComponents/buttons/Button";
import SearchIcon from '@mui/icons-material/Search';

const TransactionsSearchArea = ({ 
    transactionTypes, 
    transactionsSearchInfo, 
    setTransactionsSearchInfo 
}) => {
    return (
        <div className="transactions-search-area">
            <form className="transactions-search-form" onSubmit={(evt) => {
                evt.preventDefault();

                let hasSearchParam = false;

                for (const key in transactionsSearchInfo) {
                    if (transactionsSearchInfo[key] && key !== "hasSearchParams") {
                        hasSearchParam = true;
                    }
                }

                if (hasSearchParam) {
                    setTransactionsSearchInfo({
                        ...transactionsSearchInfo, 
                        hasSearchParams: true
                    });
                } else {
                    setTransactionsSearchInfo({
                        ...transactionsSearchInfo, 
                        hasSearchParams: false
                    });
                }
            }}>
                <div className="transactions-search-inputs">
                    <div className="transactions-search-input-fields">
                        <TextInput label="Որոնում"
                                   fields={transactionsSearchInfo}
                                   changeFieldName="searchValue"
                                   setField={setTransactionsSearchInfo}
                                   marginTop={"36px"} />
                        <SelectComponent label="Ընտրել գործարքի տեսակը" 
                                         hasFirstRow={true}
                                         firstRowLabel="Ամբողջը"
                                         firstRowValue="All"
                                         chooseData={transactionTypes}
                                         chooseDataValue="name_en"
                                         chooseDataLabel="name_am"
                                         fields={transactionsSearchInfo}
                                         changeFieldName="transactionType"
                                         setField={setTransactionsSearchInfo}
                                         width={250}
                                         marginTop={"36px"}
                                         marginLeft={"10px"} />
                    </div>
                    <div className="transactions-search-calendar-fields">
                        <Calendar label="Սկիզբ"
                                  defaultDate={Date.now() - 86400000}
                                  fields={transactionsSearchInfo}
                                  setField={setTransactionsSearchInfo} 
                                  changeFieldName="startDate" />
                        <Calendar label="Ավարտ"
                                  marginLeft="10px" 
                                  fields={transactionsSearchInfo}
                                  setField={setTransactionsSearchInfo} 
                                  changeFieldName="endDate" />
                    </div>                    
                </div>
                <div className="transactions-search-buttons">
                    <Button label="Որոնում"
                            type="submit"
                            endIcon={<SearchIcon />}
                            marginRight="10px" />
                    <Button label="Հաշվետվություն" />
                </div>
            </form>
        </div>
    );
};

export default TransactionsSearchArea;