import axios from "axios";

const getToken = async (url, username, password) => {
    return await axios.post(url, {
        username,
        password
    });
};

export default getToken;