import axios from "axios";
import { Headers } from "../constants/configs/configs";

export const getDataApi = async (url, headers) => {
    try {
        return await axios.get(url, {
            headers: headers ? headers : Headers
        });
    } catch (err) {
        return err.response;
    }
};