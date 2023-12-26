import axios from "axios";

const getToken = async (url) => {
    return await axios.get(url);
};

export default getToken;