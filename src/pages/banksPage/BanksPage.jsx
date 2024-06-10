import "./BanksPage.css";
import AddNewBank from "./addNewBank/AddNewBank";
import Table from "../../generalComponents/table/Table";
import { useSelector } from "react-redux";

const BanksPage = ({
    
}) => {
    const { banksAllData } = useSelector((state) => state.banks);
    console.log("Banks: ", JSON.stringify(banksAllData, null, 2));

    return (
        <div className="banks-content">
            <AddNewBank />
            <Table whichTable={"banks"}
                   datas={banksAllData.payload} />
        </div>
    );
};

export default BanksPage;