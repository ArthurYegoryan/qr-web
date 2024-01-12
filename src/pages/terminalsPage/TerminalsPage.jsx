import { useDispatch, useSelector } from "react-redux";
import { loadTerminals } from "../../redux/slices/terminals/terminals";
import { Navigate } from "react-router-dom";
import { editToken, logoutUser } from "../../redux/slices/authorization/auth";
import { useEffect, useMemo, useReducer, useState } from "react";
import { terminalsTableFieldsAdmin } from "../../constants/tableFields/terminalsTableFields";

const TerminalsPage = () => {
    const [ isTerminalsDataOK, setIsTerminalsDataOK ] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            dispatch(loadTerminals());
            console.log("Finish loadTerminals");
            setIsTerminalsDataOK(true);
        } catch(err) {
            localStorage.clear();
            dispatch(editToken(""));
            dispatch(logoutUser());
    
            <Navigate to="/login" />;
        }
    }, []);

    console.log(1);

    const { terminals } = useSelector((state) => state.terminals);
    console.log("Terminals: " + JSON.stringify(terminals, null, 2));

    const terminalsMemoData = useMemo(() => terminals, []);

    const columns = useMemo(() => terminalsTableFieldsAdmin, []);
    console.log("Columns: " + JSON.stringify(columns, null, 2));

    return (
        <div>
            <h1>
                Terminals Page
            </h1>
            {isTerminalsDataOK &&
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
                            terminalsMemoData.map((terminal) => {
                                return (
                                    <tr key={terminal.id}>
                                        {
                                            columns.map(({ key }) => (
                                                <td key={terminal[key]}>{terminal[key]}</td>
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