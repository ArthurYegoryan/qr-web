export const serialValidation = (fieldInfo) => {
    return /^[a-zA-Z0-9]{8}$/.test(fieldInfo);
};

export const midTidValidation = (fieldInfo) => {
    return /^[0-9]*$/.test(fieldInfo);
};

export const taxValidation = (fieldInfo) => {
    return /^[0-9]{8}$/.test(fieldInfo);
};

export const mccValidation = (fieldInfo) => {
    return /^\d{4}$/.test(fieldInfo);
};