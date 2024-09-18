import axios from "axios";

export const refreshTokenApi = async (url, body = {}) => {
    try {
        return await axios.post(url, body, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem("refresh_token")}`
            },
        });
    } catch (err) {

        return err.response;
    }
};