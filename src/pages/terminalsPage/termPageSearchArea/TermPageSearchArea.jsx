import "./TermPageSearchArea.css";
import Button from "../../../generalComponents/buttons/Button";
import SelectComponent from "../../../generalComponents/inputFields/selectComponent/SelectComponent";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import Loader from "../../../generalComponents/loaders/Loader";
import AddNewTerminalData from "./addNewTerminal/AddNewTerminalData";
import SearchIcon from '@mui/icons-material/Search';
import { terminalsSearchFields } from "../../../constants/tableFields/terminalsSearchFields";
import { searchingValidation } from "../../../utils/helpers/searchingValidation";
import { changeTerminalsFieldsForView } from "../../../utils/helpers/changeTerminalsFieldsForView";
import { postDataApi } from "../../../apis/postDataApi";
import { exportDataApi } from "../../../apis/exportDataApi";
import { colors } from "../../../assets/styles/colors";
import { urls } from "../../../constants/urls/urls";
import { paths } from "../../../constants/paths/paths";
import { editToken } from "../../../redux/slices/authorization/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

const TermPageSearchArea = ({ 
    pageSize,
    terminalsPageForSearch,
    setIsSearchedTerminalsData,
    setSearchedTerminalsPageCount,
    setTerminals,
    isSearched,
    setIsSearched,
    setIsTermDataChanged,
    isTermDataChanged
}) => {
    const role = useSelector((state) => state.auth.role.payload) ?? localStorage.getItem("role");
    const [ currentSearchPage, setCurrentSearchPage ] = useState(1);
    const [ currentSearchField, setCurrentSearchField ] = useState("");
    const [ terminalsSearchInfo, setTerminalsSearchInfo ] = useState({
        searchField: "",
        searchValue: "",
        hasSearchParams: false
    });
    const [ showLoading, setShowLoading ] = useState(false);
    const [ isOpenErrorModal, setIsOpenErrorModal ] = useState(false);
    const [ isOpenAddTermModal, setIsOpenAddTermModal ] = useState(false);
    const [ prevSearchInfo, setPrevSearchInfo ] = useState({...terminalsSearchInfo});
    const [ searchByFieldEmptyError, setSearchByFieldEmptyError ] = useState(false);
    const [ searchDataFieldEmptyError, setSearchDataFieldEmptyError ] = useState(false);
    const [ showConnectionError, setShowConnectionError ] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const callForTerminalsSearchedData = () => {
        terminalsSearchInfo.searchField = terminalsSearchFields[terminalsSearchInfo.searchField] ?? currentSearchField;

        let searchParams = {};
        for (const field in terminalsSearchInfo) {
            if (field !== "hasSearchParams") {
                searchParams[field] = terminalsSearchInfo[field];
            }
        }
        const makeCallForSearchedTerminals = async () => {
            try {
                setShowLoading(true);
                const response = await postDataApi(urls.SEARCH_TERMINALS_URL + 
                                        `?page=${terminalsPageForSearch}&size=${pageSize}`, searchParams);
                setShowLoading(false);

                if (response.status === 200) {
                    setTerminals(changeTerminalsFieldsForView(response.data.items, terminalsPageForSearch, pageSize));
                    setIsSearchedTerminalsData(true);
                    setSearchedTerminalsPageCount(response.data.pages);
                    setCurrentSearchPage(response.data.page);
                } else if (response.status === 401) {
                    dispatch(editToken(""));
                    localStorage.clear();

                    navigate(paths.LOGIN);
                }
            } catch (err) {
                console.log("Error: ", err);
            }
        };
        makeCallForSearchedTerminals();
    };

    if (terminalsPageForSearch !== currentSearchPage) {
        setCurrentSearchPage(terminalsPageForSearch);
        callForTerminalsSearchedData();
    }

    const onCliCkExportBtn = async () => {
        setShowConnectionError(false);
        try {
            await exportDataApi(urls.EXPORT_TERMINALS_URL)
        } catch (err) {
            setShowConnectionError(true);
        }
    }

    return (
        <>
            <div className="terminals-page-search-area">
                <div className="terminals-page-search-export-content">
                    <form className="terminals-page-search-form" onSubmit={(evt) => {
                        evt.preventDefault();

                        const makeSearchCall = searchingValidation(
                            terminalsSearchInfo,
                            setTerminalsSearchInfo,
                            prevSearchInfo,
                            setPrevSearchInfo,
                            isSearched,
                            setIsSearched,
                            setSearchDataFieldEmptyError,
                            setSearchByFieldEmptyError
                        );

                        if (makeSearchCall) {
                            callForTerminalsSearchedData();
                        }
                    }}>
                        <SelectComponent label={t("searchArea.searchBy")}
                                         chooseData={Object.keys(terminalsSearchFields)}
                                         hasFirstRow={true}
                                         firstRowLabel="------"
                                         firstRowValue=""
                                         width="200px"
                                         existsError={searchByFieldEmptyError}
                                         errorText={t("searchArea.emptyFieldError")} 
                                         onChooseHandler={(evt) => {
                                            setSearchByFieldEmptyError(false);
                                            setTerminalsSearchInfo({
                                                ...terminalsSearchInfo,
                                                searchField: evt.target.value
                                            });
                                            setCurrentSearchField(terminalsSearchFields[evt.target.value]);
                                        }}/>
                        <TextInput label={t("searchArea.searchData")}
                                   existsError={searchDataFieldEmptyError}
                                   errorText={t("searchArea.emptyFieldError")}
                                   onChangeHandler={(evt) => {
                                       setSearchDataFieldEmptyError(false);
                                       setTerminalsSearchInfo({ 
                                           ...terminalsSearchInfo,
                                           searchValue: (evt.target.value)
                                       })}
                                   }/>
                        <Button type="submit" 
                                label={t("searchArea.searchBtn")}
                                endIcon={<SearchIcon />}
                                height="30px"
                                marginLeft="10px"
                                marginTop="5px" />
                    </form>
                    <Button label={t("export.export")} 
                            height="30px"
                            marginTop="5px"
                            marginLeft="10px" 
                            onClickHandler={onCliCkExportBtn} />
                </div>
                {(role === "admin" || role === "bank") &&
                    <div className="terminals-page-add-new-term">
                        <Button label={t("addNewTerminal.addNewTerminal")}
                                marginTop="5px" 
                                onClickHandler={() => setIsOpenAddTermModal(true)} />
                    </div>
                }
            </div>
            {isOpenAddTermModal &&
                <ModalComponent onCloseHandler={() => setIsOpenAddTermModal(false)} 
                                isOpen={isOpenAddTermModal}
                                title={t("addNewTerminal.addNewTerminal")}
                                body={<AddNewTerminalData setIsTermDataChanged={setIsTermDataChanged}
                                                        isTermDataChanged={isTermDataChanged}
                                                        onCloseHandler={() => setIsOpenAddTermModal(false)} 
                                    />}
                />
            }
            {isOpenErrorModal &&
                <ModalComponent onCloseHandler={() => setIsOpenErrorModal(false)}
                                isOpen={isOpenErrorModal}
                                title="Որոնման սխալ"
                                body={<ErrorModalBody />}
                                bgcolor="red" 
                />
            }
            {showConnectionError &&
                <p style={{ color: colors.loginFailedColor, marginTop: 0 }} className="terminals-page-search-export-error-text">
                    {t("generalErrors.connectionError")}
                </p>
            }
            {showLoading &&
                <Loader />
            }
        </>        
    );
};

export default TermPageSearchArea;