import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";

const changeTerminalData = async (url, newData) => {
    return await axios.put(url, newData, HeaderTokenConfig);
};

export default changeTerminalData;