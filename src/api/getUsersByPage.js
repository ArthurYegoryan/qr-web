import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import users from "../test-json/users.json";
import searchedUsers from "../test-json/searchedUsers.json";

const getUsersByPage = async (url, params) => {
    if (params.page === 1 && params.searchParams.searchField) return searchedUsers[0].data;
    else if (params.page === 1) return users[0].data;

    // return await axios.get(url, { params }, HeaderTokenConfig);
};

export default getUsersByPage;