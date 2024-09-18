export const getStatusCodeIdByName = (statusCodes, statusCodeName) => {
    let statusCodeId = null;

    statusCodes.map((statusCode) => {
        if (statusCode.name_am === statusCodeName) {
            statusCodeId = statusCode.id;
        }
    });

    return statusCodeId;
};