import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import addNewBankResponse from "../test-json/addNewBank.json";

const addNewBank = async (url, newBankData) => {
    return addNewBankResponse[0].data;

    // return await axios.post(url, newBankData, HeaderTokenConfig);
};

export default addNewBank;