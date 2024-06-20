import { serialValidation, midTidValidation, mccValidation, taxValidation } from "./termDataFieldsValidation";

export const checkFieldsValidation = (
    { 
        serial, 
        tid, 
        mid, 
        pos_type, 
        mcc, 
        merchant_tax_number, 
        merchant_name, 
        merchant_name_in_am, 
        merchant_address, 
        merchant_address_in_am, 
        merchant_city, 
        merchant_city_in_am, 
        bank, 
        // payment_system 
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
        setEmptyMerchantCityInAmError,
        setEmptyBankError,
        // setEmptyPaySysError
    ]
) => {
    let existsError = false;

    if (!serial.length) {
        existsError = true;
        setEmptySerialError(true);
    } else {
        if (!serialValidation(serial)) {
            existsError = true;
            setInvalidSerialError(true);
        }
    }
    if (!tid.length) {
        existsError = true;
        setEmptyTidError(true);
    } else {
        if (!midTidValidation(tid)) {
            existsError = true;
            setInvalidTidError(true);
        }
    }
    if (!mid.length) {
        existsError = true;
        setEmptyMidError(true);
    } else {
        if (!midTidValidation(mid)) {
            existsError = true;
            setInvalidMidError(true);
        }
    }
    if (!pos_type.length) {
        existsError = true;
        setEmptyPosTypeError(true);
    }
    if (!mcc.length) {
        existsError = true;
        setEmptyMccError(true);
    } else {
        if (!mccValidation(mcc)) {
            existsError = true;
            setInvalidMccError(true);
        }
    }
    if (!merchant_tax_number.length) {
        existsError = true;
        setEmptyTaxError(true);
    } else {
        if (!taxValidation(merchant_tax_number)) {
            existsError = true;
            setInvalidTaxError(true);
        }
    }
    if (!merchant_name.length) {
        existsError = true;
        setEmptyMerchantNameError(true);
    }
    if (!merchant_name_in_am.length) {
        existsError = true;
        setEmptyMerchantNameInAmError(true);
    }
    if (!merchant_address.length) {
        existsError = true;
        setEmptyMerchantAddressError(true);
    }
    if (!merchant_address_in_am.length) {
        existsError = true;
        setEmptyMerchantAddressInAmError(true);
    }
    if (!merchant_city.length) {
        existsError = true;
        setEmptyMerchantCityError(true);
    }
    if (!merchant_city_in_am.length) {
        existsError = true;
        setEmptyMerchantCityInAmError(true);
    }
    if (!bank.length) {
        existsError = true;
        setEmptyBankError(true);
    }
    // if (!payment_system.length) {
    //     existsError = true;
    //     setEmptyPaySysError(true);
    // }

    return existsError;
};