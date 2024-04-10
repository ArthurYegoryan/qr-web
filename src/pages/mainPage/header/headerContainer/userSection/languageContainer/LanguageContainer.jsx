import { useState, useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";
import SelectComponent from "../../../../../../generalComponents/inputFields/selectComponent/SelectComponent";
import getLanguages from "../../../../../../api/getLanguages";
import { urls } from "../../../../../../constants/urls/urls";
import { editToken, logoutUser } from "../../../../../../redux/slices/authorization/auth";
import ModalComponent from "../../../../../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../../../../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import "./LanguageContainer.css";

const LanguageContainer = () => {
    const [ languages, setLanguages ] = useState([]);
    const [ selectedLanguage, setSelectedLanguage ] = useState("AM");
    const [ openCloseModal, setOpenCloseModal ] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            const getLanguagesData = async () => {
                const response = await getLanguages(urls.GET_LANGUAGES_URL);

                if (response.message === "success") {
                    console.log(JSON.stringify(languages, null, 2));
                    response.languages.map((language) => {
                        console.log(language.short_name);
                        setLanguages([...languages, language.short_name]);
                    });
                } else if (response.message === "expired token") {
                    localStorage.clear();
                    dispatch(editToken(""));
                    dispatch(logoutUser());
            
                    <Navigate to="/login" />;
                } else {
                    throw new Error("Connection error!");
                }                
            }
            getLanguagesData();
        } catch(err) {
            setOpenCloseModal(true);
        }
    }, []);

    return (
        <div className="language-container">
            <ReactFlagsSelect selected={selectedLanguage}
                              countries={languages}
                              showSelectedLabel={false}
                              showOptionLabel={false}
                              onSelect={(code) => {
                                  setSelectedLanguage(code);
                                  console.log(code);
                              }} />
        </div>
    );
};

export default LanguageContainer;