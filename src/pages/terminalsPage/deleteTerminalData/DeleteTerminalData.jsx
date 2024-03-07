import "./DeleteTerminalData.css";

const DeleteTerminalData = ({ terminal, setIsTermDataDeleted, onCloseHandler }) => {
    return (
        <div className="delete-term-data-content">
            <p>Դուք ցանկանու՞մ եք ջնջել <b>{terminal.serial}</b> սերիալ համարով տերմինալի տվյալները:</p>
        </div>
    )
};

export default DeleteTerminalData;