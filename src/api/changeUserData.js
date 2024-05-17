import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import changeUserDataResponse from "../test-json/changeUserData.json";

const changeUserData = async (url, newData) => {
    return changeUserDataResponse[0].data;

    // return await axios.put(url, newData, HeaderTokenConfig);
};

export default changeUserData;