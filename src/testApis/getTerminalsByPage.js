import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import searchedTerminals from "../test-json/searchedTerminals.json";
import terminalsPage1 from "../test-json/terminalsPage1.json";
import terminalsPage2 from "../test-json/terminalsPage2.json";
import terminalsPage1Ameria from "../test-json/terminalsPage1Ameria.json"

const getTerminalsByPage = async (url, params) => {
    if (Number(params.user_id) === 1) {
        if (params.page === 1 && params.searchParams.searchField) return searchedTerminals[0].data;
        else if (params.page === 1) return terminalsPage1[0].data;
        else if (params.page === 2) return terminalsPage2[0].data;
    } else if (Number(params.user_id) === 2) {
        if (params.page === 1) return terminalsPage1Ameria[0].data;
    }
    
    
    // return await axios.get(url, { params }, HeaderTokenConfig);
};

export default getTerminalsByPage;