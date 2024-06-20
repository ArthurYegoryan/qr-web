export const resetPrevValidations = (errorsList) => {
    errorsList.map((error) => {
        error(false)
    });
};