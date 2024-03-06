export const serialMidTidTaxValidation = (serial) => {
    return /^\d{8}$/.test(serial);
};