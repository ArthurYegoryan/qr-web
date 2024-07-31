import axios from "axios";
import { Headers } from "../constants/configs/configs";

export const putDataApi = async (url, body = {}) => {
    try {
        return await axios.put(url, body, Headers);
    } catch (err) {
        return err.response;
    }
};