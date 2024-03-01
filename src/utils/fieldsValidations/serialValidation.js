export const serialValidation = (serial) => {
    return /^\d{8}$/.test(serial);
};