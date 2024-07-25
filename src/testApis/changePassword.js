import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import changePasswordResponse from "../test-json/changePassword.json";

const changePassword = async (url, passwordsData) => {
    return changePasswordResponse[0].data;

    // return await axios.post(url, passwordsData, HeaderTokenConfig);
};

export default changePassword;