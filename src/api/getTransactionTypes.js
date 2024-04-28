import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import transactionTypes from "../test-json/transactionTypes.json";

const getTransactionTypes = async (url) => {
    return transactionTypes[0].data;

    // return await axios.get(url, HeaderTokenConfig);
};

export default getTransactionTypes;