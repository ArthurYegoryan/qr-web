import { emailValidation } from "./userDataFieldsValidation";

export const checkFieldsValidation = (
    { 
        username,
        email,
    },
    [
        setUsernameEmptyError,
        setUsernameLengthError,
        setEmailEmptyError,
        setInvalidEmailError,
    ]
) => {
    let existsError = false;

    if (!username.length) {
        existsError = true;
        setUsernameEmptyError(true);
    } else {
        if (username.length < 3) {
            existsError = true;
            setUsernameLengthError(true);
        }
    }
    if (!email.length) {
        existsError = true;
        setEmailEmptyError(true);
    } else {
        if (!emailValidation(email)) {
            existsError = true;
            setInvalidEmailError(true);
        }
    }

    return existsError;
};