export const getFieldsArrayFromAllObjectsArray = (objectsArray, fieldName) => {
    const result = [];
    objectsArray.map((object) => result.push(object[fieldName]));

    return result;
};