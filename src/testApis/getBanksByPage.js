import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import banks from "../test-json/banks.json";
import searchedBanks from "../test-json/searchedBanks.json";

const getBanks = async (url, params) => {
    if (params.page === 1 && params.searchParams.searchField) return searchedBanks[0].data;
    else if (params.page === 1) return banks[0].data;
    
    // return await axios.get(url, { params }, HeaderTokenConfig);
};

export default getBanks;