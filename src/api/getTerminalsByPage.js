import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import terminalsPage1 from "../test-json/terminalsPage1.json";
import terminalsPage2 from "../test-json/terminalsPage2.json";

const getTerminalsByPage = async (url, params) => {
    console.log("Params: ", params);
    if (params.page === 1) return terminalsPage1[0].data;
    if (params.page === 2) return terminalsPage2[0].data;
    
    // return await axios.get(url, { params } HeaderTokenConfig);
};

export default getTerminalsByPage;