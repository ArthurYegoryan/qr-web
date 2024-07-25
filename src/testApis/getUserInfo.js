import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import adminUser from "../test-json/adminUserInfo.json";
import bankUser from "../test-json/bankUserInfo.json";
import testOrg1 from "../test-json/testOrg1UserInfo.json";
import loginError from "../test-json/loginError.json";

const getUserInfo = async (url, params) => {
    if (params.username === "Admin" && params.password === "admin") return adminUser[0].data;
    else if (params.username === "Ameria" && params.password === "ameria") return bankUser[0].data;
    else if (params.username === "Test org. 1" && params.password === "test1") return testOrg1[0].data;
    else return loginError[0].data;

    // return await axios.get(url, {
    //    ...HeaderTokenConfig,
    //    params
    // });
};

export default getUserInfo;