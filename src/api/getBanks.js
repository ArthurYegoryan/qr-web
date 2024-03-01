import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import banks from "../test-json/banks.json";

const getBanks = async (url) => {
    return banks[0].data;

    // return await axios.get(url, HeaderTokenConfig);
};

export default getBanks;