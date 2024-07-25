import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import roles from "../test-json/roles.json";

const getRoles = async (url) => {
    return roles[0].data;

    // return await axios.get(url, HeaderTokenConfig);
};

export default getRoles;