export const armenianValidation = (word) => {
    return /^[ա-ֆԱ-Ֆ]+$/.test(word);
};

export const russianValidation = (word) => {
    return /^[а-яА-ЯёЁ]+$/.test(word);
};

export const englishValidation = (word) => {
    return /^[a-zA-Z]+$/.test(word);
};