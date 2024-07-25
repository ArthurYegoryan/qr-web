import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import deleteUserDataResponse from "../test-json/deleteUserData.json";

const deleteUserData = async (url, id) => {
    return deleteUserDataResponse[0].data;

    // return await axios.put(url, newData, HeaderTokenConfig);
};

export default deleteUserData;