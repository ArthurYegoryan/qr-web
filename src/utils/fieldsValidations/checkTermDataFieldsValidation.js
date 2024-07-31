import { serialValidation, tidValidation, midValidation, mccValidation, taxValidation } from "./termDataFieldsValidation";

export const checkFieldsValidation = (
    { 
        serial_number, 
        terminalId, 
        merchantId, 
        posModel_id, 
        mcc_id, 
        merchantTin, 
        merchantNameGlobal, 
        merchantNameLocal, 
        merchantAddressGlobal, 
        merchantAddressLocal, 
        city_id,
    },
    [
        setEmptySerialError,
        setInvalidSerialError,
        setEmptyTidError,
        setInvalidTidError,
        setEmptyMidError,
        setInvalidMidError,
        setEmptyPosTypeError,
        setEmptyMccError,
        setInvalidMccError,
        setEmptyTaxError,
        setInvalidTaxError,
        setEmptyMerchantNameError,
        setEmptyMerchantNameInAmError,
        setEmptyMerchantAddressError,
        setEmptyMerchantAddressInAmError,
        setEmptyMerchantCityError,
    ]
) => {
    let existsError = false;

    if (!serial_number) {
        existsError = true;
        setEmptySerialError(true);
    } else {
        if (!serialValidation(serial_number)) {
            existsError = true;
            setInvalidSerialError(true);
        }
    }
    if (!terminalId) {
        existsError = true;
        setEmptyTidError(true);
    } else {
        if (!tidValidation(terminalId)) {
            existsError = true;
            setInvalidTidError(true);
        }
    }
    if (!merchantId) {
        existsError = true;
        setEmptyMidError(true);
    } else {
        if (!midValidation(merchantId)) {
            existsError = true;
            setInvalidMidError(true);
        }
    }
    if (!posModel_id) {
        existsError = true;
        setEmptyPosTypeError(true);
    }
    if (!mcc_id) {
        existsError = true;
        setEmptyMccError(true);
    } else {
        if (!mccValidation(mcc_id)) {
            existsError = true;
            setInvalidMccError(true);
        }
    }
    if (!merchantTin) {
        existsError = true;
        setEmptyTaxError(true);
    } else {
        if (!taxValidation(merchantTin)) {
            existsError = true;
            setInvalidTaxError(true);
        }
    }
    if (!merchantNameGlobal) {
        existsError = true;
        setEmptyMerchantNameError(true);
    }
    if (!merchantNameLocal) {
        existsError = true;
        setEmptyMerchantNameInAmError(true);
    }
    if (!merchantAddressGlobal) {
        existsError = true;
        setEmptyMerchantAddressError(true);
    }
    if (!merchantAddressLocal) {
        existsError = true;
        setEmptyMerchantAddressInAmError(true);
    }
    if (!city_id) {
        existsError = true;
        setEmptyMerchantCityError(true);
    }
    // if (!merchant_city_in_am.length) {
    //     existsError = true;
    //     setEmptyMerchantCityInAmError(true);
    // }
    // if (!bank.length) {
    //     existsError = true;
    //     setEmptyBankError(true);
    // }

    return existsError;
};