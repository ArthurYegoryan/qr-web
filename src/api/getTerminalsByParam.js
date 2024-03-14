import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import searchedTerminals from "../test-json/searchedTerminals.json";

const getTerminalsByParam = async (url, param) => {
    console.log("Data: ", searchedTerminals[0].data);
    return searchedTerminals[0].data;

    // return await axios.get(url, {...HeaderTokenConfig, ...param});
};

export default getTerminalsByParam;