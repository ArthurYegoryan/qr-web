import axios from "axios";
import { Headers } from "../constants/configs/configs";

export const postDataApi = async (url, body) => {
    console.log("URL: ", url);
    console.log("Body: ", JSON.stringify(body, null, 2));

    try {
        return await axios.post(url, body, Headers);
    } catch (err) {
        return err.response;
    }
};