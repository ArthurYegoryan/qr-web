import axios from "axios";

const getAllTerminals = async (url, token) => {
    return await axios.get(url, {
        token
    });
};

export default getAllTerminals;