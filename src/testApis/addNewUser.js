import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import addNewUserResponse from "../test-json/addNewUser.json";

const addNewUser = async (url, newUserData) => {
    return addNewUserResponse[0].data;

    // return await axios.post(url, newUserData, HeaderTokenConfig);
};

export default addNewUser;