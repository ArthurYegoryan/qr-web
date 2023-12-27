import axios from "axios";

const getUserInfo = async (url, username, password) => {
    return await axios.get(url, {
        username,
        password
    });
};

export default getUserInfo;