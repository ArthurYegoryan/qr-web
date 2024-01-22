import "./TerminalsPage.css";
import TerminalsTable from "./terminalsTable/TerminalsTable";
import { useDispatch } from "react-redux";
import getAllTerminals from "../../api/getAllTerminals";
import { urls } from "../../constants/urls/urls";
import { Navigate } from "react-router-dom";
import { editToken, logoutUser } from "../../redux/slices/authorization/auth";
import { useEffect, useState } from "react";

const TerminalsPage = () => {
    const [ terminals, setTerminals ] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            const getTerminalsData = async () => {
                const response = await(getAllTerminals(urls.GET_ALL_TERMINALS_URL));

                if (response.message === "success") {
                    setTerminals(response.terminals);
                    console.log(`Terminals: ${JSON.stringify(terminals, null, 2)}`)
                } else {
                    throw new Error("Invalid error!");
                }                
            }
            getTerminalsData();
        } catch(err) {
            localStorage.clear();
            dispatch(editToken(""));
            dispatch(logoutUser());
    
            <Navigate to="/login" />;
        }
    }, []);

    return (
        <div>
            <h1>
                Terminals Page
            </h1>
            <TerminalsTable terminals={terminals} />
        </div>
    );
};

export default TerminalsPage;