import axios from "axios";
import { Headers } from "../constants/configs/configs";

export const postDataApi = async (url, body) => {
    try {
        return await axios.post(url, body, Headers);
    } catch (err) {
        return err.response;
    }
};