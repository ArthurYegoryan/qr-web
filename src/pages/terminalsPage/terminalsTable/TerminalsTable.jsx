import "./TerminalsTable.css";
import { terminalsTableFieldsAdmin as columns } from "../../../constants/tableFields/terminalsTableFields";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import ChangeTerminalData from "../changeTerminalData/ChangeTerminalData";
import { useState } from "react";
import DeleteTerminalData from "../deleteTerminalData/DeleteTerminalData";

const TerminalsTable = ({ 
    terminals, 
    setIsTermDataChanged, 
    isTermDataChanged,
    setIsTermDataDeleted,
    isTermDataDeleted
}) => {
    const [ openCloseEditModal, setOpenCloseEditModal ] = useState(false);
    const [ openCloseDeleteModal, setOpenCloseDeleteModal ] = useState(false);
    const [ selectedTerminal, setSelectedTerminal ] = useState({})

    const onClickPencilButton = (terminal) => {
        setSelectedTerminal(terminal);
        setOpenCloseEditModal(true);
    };

    const onClickTrashButton = (terminal) => {
        setSelectedTerminal(terminal);
        setOpenCloseDeleteModal(true);
    };

    return (
        <>
            {terminals.length !== 0 &&
                <table>
                    <thead>
                        <tr>
                            {
                                columns.map(({ name }) => (
                                    <th key={ name }>{ name }</th>
                                ))
                            }
                            <th key={Math.random()}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            terminals.map((terminal) => {
                                return (
                                    <tr key={terminal.id} >
                                        {
                                            columns.map(({ key }) => (
                                                <td key={terminal[key + Math.E]}>{terminal[key]}</td>
                                            ))
                                        }
                                        <td key={terminal.id + Math.E}>
                                            <span className="actions">
                                                <BsFillPencilFill className="table-row-edit-button" onClick={() => onClickPencilButton(terminal)} />
                                                <BsFillTrashFill className="table-row-delete-button" onClick={() => onClickTrashButton(terminal)} />
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            }
            {openCloseEditModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseEditModal(false)} 
                                isOpen={openCloseEditModal} 
                                title="Փոփոխել տերմինալի տվյալները"
                                body={<ChangeTerminalData terminal={selectedTerminal}
                                                          setIsTermDataChanged={setIsTermDataChanged}
                                                          isTermDataChanged={isTermDataChanged}
                                                          onCloseHandler={() => setOpenCloseEditModal(false)} />}
                />
            }
            {openCloseDeleteModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseDeleteModal(false)} 
                                isOpen={openCloseDeleteModal}
                                title="Ջնջել տերմինլի տվյալները"
                                body={<DeleteTerminalData terminal={selectedTerminal}
                                                          setIsTermDataDeleted={setIsTermDataDeleted}
                                                          isTermDataDeleted={isTermDataDeleted}
                                                          onCloseHandler={() => setOpenCloseDeleteModal(false)} />}
                />
            }
        </>
    );
};

export default TerminalsTable;