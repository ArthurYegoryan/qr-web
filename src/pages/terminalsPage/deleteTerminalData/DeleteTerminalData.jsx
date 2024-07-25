import "./DeleteTerminalData.css";
import Button from "../../../generalComponents/buttons/Button";
import deleteTerminalData from "../../../testApis/deleteTerminalData";
import { urls } from "../../../constants/urls/urls";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { editToken } from "../../../redux/slices/authorization/authSlice";

const DeleteTerminalData = ({ 
    terminal, 
    setIsTermDataDeleted,
    isTermDataDeleted,
    onCloseHandler 
}) => {
    const dispatch = useDispatch();

    const onDeleteClickHandler = async () => {
        const response = await deleteTerminalData(urls.DELETE_TERMINAL_DATA_URL, terminal.serial);

        if (response.message === "success") {
            setIsTermDataDeleted(!isTermDataDeleted);
            onCloseHandler();
        } else if (response.message === "invalid token") {
            localStorage.clear();
            dispatch(editToken(""));
    
            <Navigate to="/login" />;
        }
    };

    return (
        <div className="delete-term-data-content">
            <p>Դուք ցանկանու՞մ եք ջնջել <b>{terminal.serial}</b> սերիալ համարով տերմինալի տվյալները:</p>
            <div className="delete-term-data-buttons">
                <Button label="Ջնջել" 
                        backgroundColor="red"
                        marginRight="10px"
                        onClickHandler={() => onDeleteClickHandler()} />
                <Button label="Չեղարկել" 
                        backgroundColor="white"
                        color="red"
                        onClickHandler={() => onCloseHandler()} />
            </div>            
        </div>
    )
};

export default DeleteTerminalData;