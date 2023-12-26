import axios from "axios";

const getUserInfo = async (url, username) => {
    return await axios.get(url, {
        username
    });
};

export default getUserInfo;