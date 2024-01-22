import "./TerminalsTable.css";
import { terminalsTableFieldsAdmin as columns } from "../../../constants/tableFields/terminalsTableFields";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs"

const TerminalsTable = ({ terminals }) => {
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
                                                <BsFillPencilFill className="table-row-edit-button" onClick={() => console.log("Clicked edit command")} />
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
        </>
    );
};

export default TerminalsTable;