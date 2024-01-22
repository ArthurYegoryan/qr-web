import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import terminals from "../test-json/terminals.json";

const getAllTerminals = async (url) => {
    console.log("getAllTerminals")
    return terminals[0].data;

    // return await axios.get(url, HeaderTokenConfig);
};

export default getAllTerminals;