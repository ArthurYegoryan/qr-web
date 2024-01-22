import "./TerminalsPage.css";
import { useDispatch } from "react-redux";
import getAllTerminals from "../../api/getAllTerminals";
import { urls } from "../../constants/urls/urls";
import { Navigate } from "react-router-dom";
import { editToken, logoutUser } from "../../redux/slices/authorization/auth";
import { useEffect, useState } from "react";
import { terminalsTableFieldsAdmin as columns } from "../../constants/tableFields/terminalsTableFields";

const TerminalsPage = () => {
    const [ terminals, setTerminals ] = useState([]);
    const [ isTableRowBackColorPink, setIsTableRowBackColorPink ] = useState(false);
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
            {terminals.length !== 0 &&
                <table>
                    <thead>
                        <tr>
                            {
                                columns.map(({ name }) => (
                                    <th key={ name }>{ name }</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            terminals.map((terminal) => {
                                return (
                                    <tr key={terminal.id} className={`table-row row-bc-pink-${isTableRowBackColorPink}`}>
                                        {
                                            columns.map(({ key }) => (
                                                <td key={terminal[key + Math.E]}>{terminal[key]}</td>
                                            ))
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            }
        </div>
    );
};

export default TerminalsPage;