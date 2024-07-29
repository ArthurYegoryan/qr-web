import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import deleteBankDataResponse from "../test-json/deleteBankData.json";

const deleteBankData = async (url, bankId) => {
    return deleteBankDataResponse[0].data;

    // return await axios.put(url, bankId, HeaderTokenConfig);
};

export default deleteBankData;