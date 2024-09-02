export const getStatusCodesList = (statusCodes) => {
    const list = [];
    statusCodes.map((statusCode) => {
        list.push(statusCode.name_am);
    });

    return list;
};