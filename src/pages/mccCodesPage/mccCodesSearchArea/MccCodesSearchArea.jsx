import "./MccCodesSearchArea.css";
import TextInputComponent from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import Button from "../../../generalComponents/buttons/Button";
import SearchIcon from '@mui/icons-material/Search';
import { mccValidation } from "../../../utils/fieldsValidations/termDataFieldsValidation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const MccCodesSearchArea = ({
    setMccCodes
}) => {
    const mccs = useSelector((state) => state.mccs);
    const [ searchedMccCode, setSearchedMccCode ] = useState(null);
    const [ emptyMccError, setEmptyMccError ] = useState(false);
    const [ invalidMccError, setInvalidMccError ] = useState(false);
    const { t } = useTranslation();

    const onClickHandler = () => {
        setEmptyMccError(false);
        setInvalidMccError(false);

        if (!searchedMccCode) {
            setEmptyMccError(true);
        } else {
            if (!mccValidation(searchedMccCode)) {
                setInvalidMccError(true);
            } else {
                // make call for search mcc code
            }
        }
    }

    return (
        <div className="mcc-codes-search-area">
            <TextInputComponent label={t("mccsSection.mccCode")}
                                existsError={emptyMccError || invalidMccError}
                                errorText={
                                    emptyMccError ? t("searchArea.emptyFieldError") :
                                    invalidMccError ? t("terminalsSection.invalidMcc") : null
                                }
                                onChangeHandler={(evt) => setSearchedMccCode(evt.target.value)} />
            <Button label={t("searchArea.searchBtn")}
                    endIcon={<SearchIcon />}
                    marginLeft={"10px"}
                    onClickHandler={onClickHandler} />
        </div>
    );
};

export default MccCodesSearchArea;