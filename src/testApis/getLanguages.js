import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import languages from "../test-json/languages.json";

const getLanguages = async (url) => {
    return languages[0].data;

    // return await axios.get(url, HeaderTokenConfig);
};

export default getLanguages;