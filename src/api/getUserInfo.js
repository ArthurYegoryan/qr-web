import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import adminUser from "../test-json/adminUserInfo.json";
// import bankUser from "../test-json/bankUserInfo.json";
// import loginError from "../test-json/loginError.json"

const getUserInfo = async (url, params) => {
    // console.log("User: " + JSON.stringify(bankUser[0], null, 2));
    return adminUser[0].data;
    // return bankUser[0].data;

    // return loginError[0];

    // return await axios.get(url, {
    //    ...HeaderTokenConfig,
    //    params
    // });
};

export default getUserInfo;