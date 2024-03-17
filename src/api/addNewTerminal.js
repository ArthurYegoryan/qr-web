import axios from "axios";
import { HeaderTokenConfig } from "../constants/configs/configs";
import addNewTerminalResponse from "../test-json/addNewTerminal.json";

const addNewTerminal = async (url, newTerminalData) => {
    return addNewTerminalResponse[0].data;

    // return await axios.post(url, newData, HeaderTokenConfig);
};

export default addNewTerminal;