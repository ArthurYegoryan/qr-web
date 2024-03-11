import "./TerminalsPage.css";
import TerminalsTable from "./terminalsTable/TerminalsTable";
import { useDispatch } from "react-redux";
import getAllTerminals from "../../api/getAllTerminals";
import { urls } from "../../constants/urls/urls";
import { Navigate } from "react-router-dom";
import { editToken, logoutUser } from "../../redux/slices/authorization/auth";
import { useEffect, useState } from "react";
import ModalComponent from "../../generalComponents/modalComponent/ModalComponent";
import ErrorModalBody from "../../generalComponents/modalComponent/errorModalBody/ErrorModalBody";

const TerminalsPage = () => {
    const [ terminals, setTerminals ] = useState([]);
    const [ openCloseModal, setOpenCloseModal ] = useState(false);
    const [ isTermDataChanged, setIsTermDataChanged ] = useState(false);
    const [ isTermDataDeleted, setIsTermDataDeleted ] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            const getTerminalsData = async () => {
                const response = await(getAllTerminals(urls.GET_ALL_TERMINALS_URL));

                if (response.message === "success") {
                    setTerminals(response.terminals);
                    console.log(`Terminals: ${JSON.stringify(terminals, null, 2)}`);
                } else if (response.message === "expired token") {
                    localStorage.clear();
                    dispatch(editToken(""));
                    dispatch(logoutUser());
            
                    <Navigate to="/login" />;
                } else {
                    throw new Error("Connection error!");
                }                
            }
            getTerminalsData();
        } catch(err) {
            setOpenCloseModal(true);
        }
    }, [isTermDataChanged, isTermDataDeleted]);

    return (
        <div>
            <h1>
                Terminals Page
            </h1>
            <TerminalsTable terminals={terminals} 
                            setIsTermDataChanged={setIsTermDataChanged}
                            isTermDataChanged={isTermDataChanged} 
                            setIsTermDataDeleted={setIsTermDataDeleted}
                            isTermDataDeleted={isTermDataDeleted} />
            {openCloseModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseModal(false)} 
                                isOpen={openCloseModal} 
                                title="Connection error!"
                                body={<ErrorModalBody />}
                                bgcolor="red"
                />
            }
        </div>
    );
};

export default TerminalsPage;