export const makeObjFieldsToString = (array) => {
    const toStringArr = [];

    array.map((obj) => {
        const cloneObj = {};

        for (const info in obj) {
            if (typeof obj[info] === "boolean") {
                cloneObj[info] = String(obj[info]);
            } else {
                cloneObj[info] = obj[info];
            }
        }

        toStringArr.push(cloneObj);
    });

    return toStringArr;
};