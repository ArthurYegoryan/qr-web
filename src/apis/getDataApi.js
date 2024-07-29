import axios from "axios";
import { Headers } from "../constants/configs/configs";

export const getDataApi = async (url) => {
    try {
        return await axios.get(url, Headers);
    } catch (err) {
        return err.response;
    }
};