import "./TransactionsSearchArea.css";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import SelectComponent from "../../../generalComponents/inputFields/selectComponent/SelectComponent";
import Calendar from "../../../generalComponents/inputFields/calendarComponent/CalendarComponent";

const TransactionsSearchArea = ({ 
    transactionTypes, 
    transactionsSearchInfo, 
    setTransactionsSearchInfo 
}) => {
    return (
        <div className="transactions-search-area">
            <form className="transactions-search-form" onSubmit={() => console.log(transactionsSearchInfo)}>
                <TextInput label="Որոնում"
                           setField={setTransactionsSearchInfo}
                           marginTop={"28px"}
                           marginLeft={"0"} />
                <SelectComponent label="Ընտրել գործարքի տեսակը" 
                                 chooseData={transactionTypes}
                                 data={transactionsSearchInfo}
                                 field="transactionType"
                                 setField={setTransactionsSearchInfo}
                                 width={250}
                                 marginTop={"36px"} />
                <Calendar label="Սկիզբ"
                          defaultDate={Date.now() - 86400000}
                          marginLeft="200px" />
                <Calendar label="Ավարտ"
                          defaultDate={Date.now()}
                          marginLeft="10px" />
            </form>
        </div>
    );
};

export default TransactionsSearchArea;