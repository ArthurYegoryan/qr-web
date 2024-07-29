import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import paymentSystems from "../test-json/paymentSystems.json";

const getPaymentSystems = async (url) => {
    return paymentSystems[0].data;

    // return await axios.get(url, HeaderTokenConfig);
};

export default getPaymentSystems;