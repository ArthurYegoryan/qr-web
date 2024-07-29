import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import changeBankDataResponse from "../test-json/changeBankData.json";

const changeBankData = async (url, newData) => {
    return changeBankDataResponse[0].data;

    // return await axios.put(url, newData, HeaderTokenConfig);
};

export default changeBankData;