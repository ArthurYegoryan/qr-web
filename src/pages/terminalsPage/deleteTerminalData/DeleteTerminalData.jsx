import "./DeleteTerminalData.css";
import Button from "../../../generalComponents/buttons/Button";
import deleteTerminalData from "../../../api/deleteTerminalData";
import { urls } from "../../../constants/urls/urls";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { editToken, logoutUser } from "../../../redux/slices/authorization/auth";

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
            dispatch(logoutUser());
    
            <Navigate to="/login" />;
        }
    };

    return (
        <div className="delete-term-data-content">
            <p>Դուք ցանկանու՞մ եք ջնջել <b>{terminal.serial}</b> սերիալ համարով տերմինալի տվյալները:</p>
            <Button label="Ջնջել" 
                    className="delete-term-data-delete-btn"
                    onClickHandler={() => onDeleteClickHandler()} />
            <Button label="Չեղարկել" 
                    className="delete-term-data-cancel-btn"
                    onClickHandler={() => onCloseHandler()} />
        </div>
    )
};

export default DeleteTerminalData;