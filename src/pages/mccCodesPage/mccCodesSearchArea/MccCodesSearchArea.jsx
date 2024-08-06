import "./MccCodesSearchArea.css";
import TextInputComponent from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import { addNumeration } from "../../../utils/helpers/addNumeration";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MccCodesSearchArea = ({
    setMccCodes,
    mccCodesAll,
    makeCallForMccPageData,
    setMakeCallForMccPageData,
    pageSize,
    setIsSearchedMccsData,
    setSearhedMccCodesPageCount,
    searchedMccCodesCurrentPage
}) => {
    const [ matchedMccs, setMatchedMccs ] = useState([]);
    const [ prevPage, setPrevPage ] = useState(1);
    const { t } = useTranslation();

    const searchCondition = (e) => {
        return Number(e.target.value) >= 0 && e.target.value.length <= 4;
    }

    const mccsPageDataDetector = () => {
        const searchedMccsByPage = [];
        for (let i = 0; i < (matchedMccs.length < pageSize ? matchedMccs.length : pageSize); i++) {
            const currentMcc = matchedMccs[(searchedMccCodesCurrentPage - 1) * 10 + i];

            if (currentMcc) searchedMccsByPage.push(currentMcc);
        }

        setIsSearchedMccsData(true);
        setSearhedMccCodesPageCount(Math.ceil(matchedMccs.length / pageSize));

        setMccCodes(addNumeration(searchedMccsByPage, searchedMccCodesCurrentPage, pageSize));
    };

    if (searchedMccCodesCurrentPage !== prevPage) {
        setPrevPage(searchedMccCodesCurrentPage);
        mccsPageDataDetector();
    }

    const onChangeHandler = (e) => {
        if (e) {
            if (Number(e.target.value) >= 0 && e.target.value.length <= 4) {
                const matchedMccs = [];

                mccCodesAll.map((mcc) => {
                    if (mcc.code.includes(e.target.value)) {
                        matchedMccs.push(mcc);
                    }
                });

                setMatchedMccs(matchedMccs);

                const searchedMccsByPage = [];
                for (let i = 0; i < (matchedMccs.length < pageSize ? matchedMccs.length : pageSize); i++) {
                    searchedMccsByPage.push(matchedMccs[(searchedMccCodesCurrentPage - 1) * 10 + i]);
                }

                setIsSearchedMccsData(true);
                setSearhedMccCodesPageCount(Math.ceil(matchedMccs.length / pageSize));

                setMccCodes(addNumeration(searchedMccsByPage, searchedMccCodesCurrentPage, pageSize));
            }
        } else {
            setMakeCallForMccPageData(!makeCallForMccPageData);
        }
    };

    return (
        <div className="mcc-codes-search-area">
            <TextInputComponent placeholder={t("mccsSection.mccCode")}
                                isSearchInput={true}
                                searchCondition={searchCondition}
                                onChangeHandler={onChangeHandler} />
        </div>
    );
};

export default MccCodesSearchArea;