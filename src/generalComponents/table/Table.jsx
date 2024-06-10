import React, { useState } from 'react';
import { Space, Table } from 'antd';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

// const columns = [
//   {
//     title: 'Full Name',
//     width: 100,
//     dataIndex: 'name',
//     key: 'name',
//     fixed: 'left',
//   },
//   {
//     title: 'Age',
//     width: 100,
//     dataIndex: 'age',
//     key: 'age',
//     fixed: 'left',
//   },
//   {
//     title: 'Column 1',
//     dataIndex: 'address',
//     key: '1',
//     width: 150,
//   },
//   {
//     title: 'Column 2',
//     dataIndex: 'address',
//     key: '2',
//     width: 150,
//   },
//   {
//     title: 'Column 3',
//     dataIndex: 'address',
//     key: '3',
//     width: 150,
//   },
//   {
//     title: 'Column 4',
//     dataIndex: 'address',
//     key: '4',
//     width: 150,
//   },
//   {
//     title: 'Column 5',
//     dataIndex: 'address',
//     key: '5',
//     width: 150,
//   },
//   {
//     title: 'Column 6',
//     dataIndex: 'address',
//     key: '6',
//     width: 150,
//   },
//   {
//     title: 'Column 7',
//     dataIndex: 'address',
//     key: '7',
//     width: 150,
//   },
//   {
//     title: 'Column 8',
//     dataIndex: 'address',
//     key: '8',
//   },
//   {
//     title: 'Action',
//     key: 'operation',
//     fixed: 'right',
//     width: 100,
//     render: () => <a>action</a>,
//   },
// ];

const TableComponent = ({ 
    whichTable, 
    datas,
    banks,
    onClickEditButton, 
    onClickDeleteButton 
}) => {
    // const [fixedTop, setFixedTop] = useState(false);

    const terminalsColumns = [
        {
            title: 'ID',
            width: 10,
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Terminal ID',
            width: 14,
            dataIndex: 'tid',
            key: 'tid',
        },
        {
            title: 'Merchant ID',
            dataIndex: 'mid',
            key: 'mid',
            width: 14,
        },
        {
            title: 'S/N',
            dataIndex: 'serial',
            key: 'serial',
            width: 14,
        },
        {
            title: 'MCC',
            dataIndex: 'mcc',
            key: 'mcc',
            width: 10,
        },
        {
            title: 'Is Active',
            dataIndex: 'active',
            key: 'active',
            width: 11,
        },
        {
            title: 'POS type',
            dataIndex: 'pos_type',
            key: 'pos_type',
            width: 16,
        },
        {
            title: 'Merchant name',
            dataIndex: 'merchant_name',
            key: 'merchant_name',
            width: 25,
        },
        {
            title: 'Merchant TAX number',
            dataIndex: 'merchant_tax_number',
            key: 'merchant_tax_number',
            width: 15,
        },
        {
            title: 'Merchant city',
            dataIndex: 'merchant_city_in_am',
            key: 'merchant_city_in_am',
            width: 13,
        },
        {
            title: 'Merchant address',
            dataIndex: 'merchant_address_in_am',
            key: 'merchant_address_in_am',
            width: 25,
        },
        {
            title: 'Bank',
            dataIndex: 'bank',
            key: 'bank',
            width: 13,
        },
        {
            title: 'Action',
            key: 'operation',
            width: 10,
            render: (record) => (
                <Space size="middle">
                    <BsFillPencilFill style={{ color: "blue", cursor: "pointer" }} onClick={() => onClickEditButton(record)} />
                    <BsFillTrashFill style={{ color: "red", cursor: "pointer" }} onClick={() => onClickDeleteButton(record)} />
                </Space>
            )
        },
    ];

    const transactionsColumns = [
        {
            title: 'ID',
            width: 10,
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'RRN',
            width: 10,
            dataIndex: 'rrn',
            key: 'rrn',
        },
        {
            title: 'Terminal ID',
            dataIndex: 'tid',
            key: 'tid',
            width: 10,
        },
        {
            title: 'Merchant ID',
            dataIndex: 'mid',
            key: 'mid',
            width: 10,
        },
        
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: 10,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 20,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 10,
        },
        {
            title: 'Trx type',
            dataIndex: 'trx_type',
            key: 'trx_type',
            width: 8,
        },
        {
            title: 'Bank',
            dataIndex: 'bank',
            key: 'bank',
            width: 10,
        },
        {
            title: 'Pay sys',
            dataIndex: 'payment_system',
            key: 'payment_system',
            width: 10,
        }
    ];

    const usersColumns = [
        {
            title: 'ID',
            width: 10,
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            width: 20,
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Bank',
            dataIndex: 'bank',
            key: 'bank',
            width: 20,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 35,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 20,
        },
        {
            title: 'Action',
            key: 'operation',
            width: 15,
            render: (record) => (
                <Space size="middle">
                    <BsFillPencilFill style={{ color: "blue", cursor: "pointer" }} onClick={() => onClickEditButton(record)} />
                    <BsFillTrashFill style={{ color: "red", cursor: "pointer" }} onClick={() => onClickDeleteButton(record)} />
                </Space>
            )
        },
    ];

    const data = [];

    let columns = [];

    if (whichTable === "users") {
        columns = usersColumns;

        for (let i = 0; i < datas.length; i++) {
            data.push({
                id: datas[i].id,
                username: datas[i].username,
                bank: datas[i].bank !== "FPS" ? banks[datas[i].bank] : "FPS",
                email: datas[i].email,
                role: datas[i].role
            });
        }
    }
    else if (whichTable === "terminals") columns = terminalsColumns;
    else if (whichTable === "transactions") columns = transactionsColumns;    

    return (
        <Table
            columns={columns}            
            dataSource={whichTable === "users" ? data : datas}
            pagination={false}
            //   scroll={{
            //     x: 1500,
            //   }}
            //   summary={() => (
            //     <Table.Summary fixed={fixedTop ? 'top' : 'bottom'}>
            //       <Table.Summary.Row>
            //         <Table.Summary.Cell index={0} colSpan={2}>
            //           <Switch
            //             checkedChildren="Fixed Top"
            //             unCheckedChildren="Fixed Top"
            //             checked={fixedTop}
            //             onChange={() => {
            //               setFixedTop(!fixedTop);
            //             }}
            //           />
            //         </Table.Summary.Cell>
            //         <Table.Summary.Cell index={2} colSpan={8}>
            //           Scroll Context
            //         </Table.Summary.Cell>
            //         <Table.Summary.Cell index={10}>Fix Right</Table.Summary.Cell>
            //       </Table.Summary.Row>
            //     </Table.Summary>
            //   )}
            // antd site header height
            sticky={{
                offsetHeader: 64,
            }}
        />
    );
};
export default TableComponent;