import axios from "axios";

export const exportDataApi = async (url) => {
     return await axios.get(
        url,
        {
            responseType: 'blob',
            headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
        }
    ).then((response) => {
        if (response.status !== 200) {
            throw new Error('Network status was not 200');
        }

        const fileName = response.headers["content-disposition"].slice(22, response.headers["content-disposition"].length - 1);
        console.log(fileName);
        const href = window.URL.createObjectURL(response.data);

        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }).catch(err => console.log(err));
};