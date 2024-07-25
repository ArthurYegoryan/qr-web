import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import deleteTerminalDataResponse from "../test-json/deleteTerminalData.json";

const deleteTerminalData = async (url, serial) => {
    return deleteTerminalDataResponse[0].data;

    // return await axios.put(url, newData, HeaderTokenConfig);
};

export default deleteTerminalData;