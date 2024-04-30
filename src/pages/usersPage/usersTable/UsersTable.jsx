import "./UsersTable.css";
import { usersTableFields as columns } from "../../../constants/tableFields/usersTableFields";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useState } from "react";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import { useTranslation } from 'react-i18next';

const UsersTable = ({ users }) => {
    const [ openCloseEditModal, setOpenCloseEditModal ] = useState(false);
    const [ openCloseDeleteModal, setOpenCloseDeleteModal ] = useState(false);
    const [ selectedUser, setSelectedUser ] = useState({});
    const { t } = useTranslation();

    const onClickPencilButton = (user) => {
        setSelectedUser(user);
        setOpenCloseEditModal(true);
    };

    const onClickTrashButton = (user) => {
        setSelectedUser(user);
        setOpenCloseDeleteModal(true);
    };

    return (
        <>
            {users.length !== 0 &&
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
                            users.map((user) => {
                                return (
                                    <tr key={user.id} >
                                        {
                                            columns.map(({ key }) => (
                                                <td key={user[key + Math.E]}>{user[key]}</td>
                                            ))
                                        }
                                        <td key={user.id + Math.E}>
                                            <span className="actions">
                                                <BsFillPencilFill className="table-row-edit-button" onClick={() => onClickPencilButton(user)} />
                                                <BsFillTrashFill className="table-row-delete-button" onClick={() => onClickTrashButton(user)} />
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
                                // title={t("changeTerminalData.changeTerminalData")}
                                // body={<ChangeTerminalData terminal={selectedTerminal}
                                //                           setIsTermDataChanged={setIsTermDataChanged}
                                //                           isTermDataChanged={isTermDataChanged}
                                //                           onCloseHandler={() => setOpenCloseEditModal(false)} 
                                                        //   />}
                />
            }
            {openCloseDeleteModal &&
                <ModalComponent onCloseHandler={() => setOpenCloseDeleteModal(false)} 
                                isOpen={openCloseDeleteModal}
                                // title={t("deleteTerminalData.deleteTerminalData")}
                                // body={<DeleteTerminalData terminal={selectedTerminal}
                                //                           setIsTermDataDeleted={setIsTermDataDeleted}
                                //                           isTermDataDeleted={isTermDataDeleted}
                                //                           onCloseHandler={() => setOpenCloseDeleteModal(false)} 
                                                        //   />}
                />
            }
        </>
    );
};

export default UsersTable;