import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";

const getAllTerminals = async (url) => {
    return await axios.get(url, HeaderTokenConfig);
};

export default getAllTerminals;