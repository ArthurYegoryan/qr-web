import axios from "axios";
import { Headers } from "../constants/configs/configs";

export const putDataApi = async (url, body = {}, headers) => {
    try {
        return await axios.put(url, body, {
            headers: headers ? headers : Headers
        });
    } catch (err) {
        return err.response;
    }
};