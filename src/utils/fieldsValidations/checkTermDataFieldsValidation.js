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
        setEmptyTaxError,
        setInvalidTaxError,
        setEmptyMerchantNameError,
        setLongMerchantNameError,
        setEmptyMerchantNameInAmError,
        setLongMerchantNameInAmError,
        setEmptyMerchantAddressError,
        setLongMerchantAddressError,
        setEmptyMerchantAddressInAmError,
        setLongMerchantAddressInAmError,
        setEmptyMerchantCityError,
    ],
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
    } else {
        if (merchantNameGlobal.length > 99) {
            existsError = true;
            setLongMerchantNameError(true);
        }
    }
    if (!merchantNameLocal) {
        existsError = true;
        setEmptyMerchantNameInAmError(true);
    } else {
        if (merchantNameLocal.length > 99) {
            existsError = true;
            setLongMerchantNameInAmError(true);
        }
    }
    if (!merchantAddressGlobal) {
        existsError = true;
        setEmptyMerchantAddressError(true);
    } else {
        if (merchantAddressGlobal.length > 99) {
            existsError = true;
            setLongMerchantAddressError(true);
        }
    }
    if (!merchantAddressLocal) {
        existsError = true;
        setEmptyMerchantAddressInAmError(true);
    } else {
        if (merchantAddressLocal.length > 99) {
            existsError = true;
            setLongMerchantAddressInAmError(true);
        }
    }
    if (!city_id) {
        existsError = true;
        setEmptyMerchantCityError(true);
    }

    return existsError;
};