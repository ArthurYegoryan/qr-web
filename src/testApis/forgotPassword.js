import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import forgotPasswordResponse from "../test-json/forgotPassword.json";

const forgotPassword = async (url, email) => {
    return forgotPasswordResponse[0].data;

    // return await axios.post(url, email, HeaderTokenConfig);
};

export default forgotPassword;