import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import usersPage1 from "../test-json/usersPage1.json";
import usersPage2 from "../test-json/usersPage2.json";
import searchedUsers from "../test-json/searchedUsers.json";
import organizationsPage1 from "../test-json/organizationsPage1.json"

const getUsersByPage = async (url, params) => {
    if (Number(params.user_id) === 1) {
        if (params.page === 1 && params.searchParams.searchField) return searchedUsers[0].data;
        else if (params.page === 1) return usersPage1[0].data;
        else if (params.page === 2) return usersPage2[0].data;
    } else if (Number(params.user_id) === 2) {
        if (params.page === 1) return organizationsPage1[0].data;
    }
    

    // return await axios.get(url, { params }, HeaderTokenConfig);
};

export default getUsersByPage;