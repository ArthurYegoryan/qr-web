import { emailValidation, passwordValidations } from "./userDataFieldsValidation";

export const checkFieldsValidation = (
    { 
        username,
        bank,
        email,
        role,
        password
    },
    [
        setUsernameEmptyError,
        setUsernameLengthError,
        setBankEmptyError,
        setEmailEmptyError,
        setInvalidEmailError,
        setRoleEmptyError,
        setPasswordEmptyError,
        setInvalidPasswordError
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
    if (!bank.length) {
        existsError = true;
        setBankEmptyError(true);
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
    if (!role.length) {
        existsError = true;
        setRoleEmptyError(true);
    }
    if (!password.length) {
        existsError = true;
        setPasswordEmptyError(true);
    } else {
        if (!passwordValidations(password)) {
            existsError = true;
            setInvalidPasswordError(true);
        }
    }

    return existsError;
};