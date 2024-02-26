import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import terminalsTypes from "../test-json/terminalsTypes.json";

const getTerminalsTypes = async (url) => {
    return terminalsTypes[0].data;

    // return await axios.get(url, HeaderTokenConfig);
};

export default getTerminalsTypes;