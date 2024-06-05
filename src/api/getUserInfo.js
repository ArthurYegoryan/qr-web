import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import user from "../test-json/userInfo.json";
// import loginError from "../test-json/loginError.json"

const getUserInfo = async (url, params) => {
    // console.log("getUserInfo");
    // console.log("user: " + JSON.stringify(user[0], null, 2));
    return user[0].data;

    // return loginError[0];

    // return await axios.get(url, {
    //    ...HeaderTokenConfig,
    //    params
    // });
};

export default getUserInfo;