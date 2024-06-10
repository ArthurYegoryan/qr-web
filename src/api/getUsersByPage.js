import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import usersPage1 from "../test-json/usersPage1.json";
import usersPage2 from "../test-json/usersPage2.json";
import searchedUsers from "../test-json/searchedUsers.json";

const getUsersByPage = async (url, params) => {
    if (params.page === 1 && params.searchParams.searchField) return searchedUsers[0].data;
    else if (params.page === 1) return usersPage1[0].data;
    else if (params.page === 2) return usersPage2[0].data;

    // return await axios.get(url, { params }, HeaderTokenConfig);
};

export default getUsersByPage;