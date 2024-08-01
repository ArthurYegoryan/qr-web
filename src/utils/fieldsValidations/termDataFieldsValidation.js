export const serialValidation = (fieldInfo) => {
    return /^[A-Z0-9]{8,24}$/.test(fieldInfo);
};

export const tidValidation = (fieldInfo) => {
    return /^[0-9]{8}$/.test(fieldInfo);
};

export const midValidation = (fieldInfo) => {
    // return /^[0-9]*$/.test(fieldInfo);
    return /^[0-9]{8,15}$/.test(fieldInfo);
};

export const taxValidation = (fieldInfo) => {
    return /^[0-9]{8}$/.test(fieldInfo);
};

export const mccValidation = (fieldInfo) => {
    return /^[0-9]{4}$/.test(fieldInfo);
};