import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import users from "../test-json/users.json";

const getUsers = async (url) => {
    return users[0].data;

    // return await axios.get(url, HeaderTokenConfig);
};

export default getUsers;