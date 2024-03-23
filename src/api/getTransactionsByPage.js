import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import transactionsPage1 from "../test-json/transactionsPage1.json";
import transactionsPage2 from "../test-json/transactionsPage2.json";

const getTransactionsByPage = async (url, params) => {
    if (params.page === 1) return transactionsPage1[0].data;
    if (params.page === 2) return transactionsPage2[0].data;
    
    // return await axios.get(url, { params } HeaderTokenConfig);
};

export default getTransactionsByPage;