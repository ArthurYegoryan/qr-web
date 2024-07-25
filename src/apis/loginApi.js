import axios from "axios";

export const loginApi = async (url, {username, password}) => {
    try {
        const form = new FormData();
        form.append('username', username);
        form.append('password', password);
        
        return await axios.post(url, form);
    } catch (err) {
        return err.response;
    }
};