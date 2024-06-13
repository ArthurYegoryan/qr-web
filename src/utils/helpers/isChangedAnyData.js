export const isChangedAnyData = (prevObj, newObj) => {
    for (const prop in prevObj) {
        if (prevObj[prop] !== String(newObj[prop]) && prop !== "id") {
            return true;
        }
    }

    return false;
}