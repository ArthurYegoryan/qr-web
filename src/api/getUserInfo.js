import axios from "axios";
import user from "../test-json/userInfo.json";

const getUserInfo = async (url, username, password) => {
    console.log("getUserInfo");
    console.log("user: " + JSON.stringify(user[0], null, 2));
    return user[0];

    // return await axios.get(url, {
    //     username,
    //     password
    // });
};

export default getUserInfo;