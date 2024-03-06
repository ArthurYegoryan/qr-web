import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import changeTerminalDataResponse from "../test-json/changeTerminalData.json";

const changeTerminalData = async (url, newData) => {
    return changeTerminalDataResponse[0].data;

    // return await axios.put(url, newData, HeaderTokenConfig);
};

export default changeTerminalData;