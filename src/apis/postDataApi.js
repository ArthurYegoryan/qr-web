import axios from "axios";
import { Headers } from "../constants/configs/configs";

export const postDataApi = async (url, body, headers) => {
    try {
        return await axios.post(url, body, {
            headers: headers ? headers : Headers
        });
    } catch (err) {
        return err.response;
    }
};