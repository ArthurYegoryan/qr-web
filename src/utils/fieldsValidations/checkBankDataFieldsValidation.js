import { armenianValidation, russianValidation, englishValidation } from "./bankDataFieldsValidation";
import { emailValidation } from "./userDataFieldsValidation";

export const checkFieldsValidation = (
    { 
        short_name, 
        name_am, 
        name_en, 
        name_ru, 
        email, 
        secondEmail
    },
    [
        setShortNameEmptyError,
        setNameAmEmptyError,
        setNameAmLanguageError,
        setNameRuEmptyError,
        setNameRuLanguageError,
        setNameEnEmptyError,
        setNameEnLanguageError,
        setEmailEmptyError,
        setInvalidEmailError,
        setInvalidSecondEmailError,
    ]
) => {
    let existsError = false;

    if (!short_name.length) {
        existsError = true;
        setShortNameEmptyError(true);
    }
    if (!name_am.length) {
        existsError = true;
        setNameAmEmptyError(true);
    } else {
        if (!armenianValidation(name_am)) {
            existsError = true;
            setNameAmLanguageError(true);
        }
    }
    if (!name_ru.length) {
        existsError = true;
        setNameRuEmptyError(true);
    } else {
        if (!russianValidation(name_ru)) {
            existsError = true;
            setNameRuLanguageError(true);
        }
    }
    if (!name_en.length) {
        existsError = true;
        setNameEnEmptyError(true);
    } else {
        if (!englishValidation(name_en)) {
            existsError = true;
            setNameEnLanguageError(true);
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
    if (secondEmail.length) {
        if (!emailValidation(secondEmail)) {
            existsError = true;
            setInvalidSecondEmailError(true);
        }
    }

    return existsError;
};