import "./TerminalsTable.css";
import { terminalsTableFieldsAdmin as columns } from "../../../constants/tableFields/terminalsTableFields";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import ChangeTerminalData from "../changeTerminalData/ChangeTerminalData";
import { useState } from "react";

const TerminalsTable = ({ terminals }) => {
    const [ openCloseModal, setOpenCloseModal ] = useState(false);
    const [ selectedTerminal, setSelectedTerminal ] = useState({})

    const onClickPencilButton = (terminal) => {
        setSelectedTerminal(terminal);
        setOpenCloseModal(true);
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
                                                <BsFillTrashFill className="table-row-delete-button" />
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            }
            {openCloseModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseModal(false)} 
                                isOpen={openCloseModal} 
                                title="Փոփոխել տերմինալի տվյալները"
                                body={<ChangeTerminalData terminal={selectedTerminal} onCloseHandler={() => setOpenCloseModal(false)} />}
                />
            }
        </>
    );
};

export default TerminalsTable;