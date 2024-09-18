export const deleteCookie = (name) => {
    document.cookie = `${name}=`;
};