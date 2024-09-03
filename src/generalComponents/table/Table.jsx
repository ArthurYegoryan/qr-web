import { Space, Table } from 'antd';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useSelector } from 'react-redux';

const TableComponent = ({ 
    whichTable, 
    datas,
    setCurrentData,
    banks,
    size = "normal",
    windowHeight,
    minWidth,
    scrollBoth = false,
    scrollX = false,
    scrollY = false,
    filterHandlers,
    onClickEditButton, 
    onClickDeleteButton 
}) => {
    const role = useSelector((state) => state.auth.role.payload) ?? localStorage.getItem("role");

    const terminalsColumns = [
        {
            title: (
                <img src={process.env.PUBLIC_URL + 'img/sharp.svg'} 
                     alt="ID" 
                     style={{
                         width: "20px"
                     }}
                />               
            ),
            dataIndex: 'number',
            key: 'number',
            width: "5px",
        },
        {
            title: 'Terminal ID',
            dataIndex: 'terminalId',
            key: 'terminalId',
            width: "12px",
        },
        {
            title: 'Merchant ID',
            dataIndex: 'merchantId',
            key: 'merchantId',
            width: "14px",
        },
        {
            title: 'S/N',
            dataIndex: 'serial_number',
            key: 'serial_number',
            width: "15px",
        },
        {
            title: 'MCC',
            dataIndex: 'mcc',
            key: 'mcc',
            width: "8px",
        },
        {
            title: 'Active',
            dataIndex: 'is_active',
            key: 'is_active',
            width: "8px",
            render: (record) => (
                <Space size="middle">
                    {
                        record === "true" ? 
                            <img src={process.env.PUBLIC_URL + 'img/success.svg'} 
                                alt="Success" 
                                style={{
                                    width: "25px"
                                }}
                            /> :
                        record === "false" ?
                            <img src={process.env.PUBLIC_URL + 'img/fail.svg'} 
                                alt="Fail" 
                                style={{
                                    width: "25px"
                                }}
                            /> : null
                    }
                </Space>
            )
        },
        {
            title: 'Inactive date',
            dataIndex: 'inactiveDate',
            key: 'inactiveDate',
            width: 13,
        },
        {
            title: (
                <img src={process.env.PUBLIC_URL + 'img/pos.svg'} 
                     alt="Cities" 
                     style={{
                        width: "40px"
                     }}
                />
            ),
            dataIndex: 'posModel',
            key: 'posModel',
            width: 16,
        },
        {
            title: 'Merchant name',
            dataIndex: 'merchantNameLocal',
            key: 'merchantNameLocal',
            width: 25,
        },
        {
            title: 'TAX',
            dataIndex: 'merchantTin',
            key: 'merchantTin',
            width: 15,
        },
        {
            title: (
                <img src={process.env.PUBLIC_URL + 'img/cities.svg'} 
                     alt="Cities" 
                     style={{
                        width: "40px"
                     }}
                />
            ),
            dataIndex: 'city',
            key: 'city',
            width: 13,
        },
        {
            title: 'Merchant address',
            dataIndex: 'merchantAddressLocal',
            key: 'merchantAddressLocal',
            width: 25,
        },
        {
            title: 'Registr. date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 13,
        },
        {
            title: (
                <img src={process.env.PUBLIC_URL + 'img/bank_1.svg'} 
                     alt="Bank" 
                     style={{
                        width: "40px"
                     }}
                />
            ),
            dataIndex: 'paymentSystem',
            key: 'paymentSystem',
            width: 13,
        },
        {
            title: 'Action',
            key: 'operation',
            width: 10,
            render: (record) => (
                <Space size="middle">
                    {/* <BsFillPencilFill style={{ color: "blue", cursor: "pointer" }} onClick={() => {
                        (role === "admin" || role === "bank") && onClickEditButton(record);
                    }} /> */}
                    <BsFillTrashFill style={{ color: "red", cursor: "pointer" }} onClick={() => {
                        (role === "admin" || role === "bank") && onClickDeleteButton(record);
                    }} />
                </Space>
            )
        },
    ];

    const transactionsColumns = [
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => filterHandlers.byId()}
                    />
                    &nbsp;&nbsp;<i>N</i>
                </span>                
            ),
            dataIndex: 'number',
            key: 'number',
            width: "5px",
        },
        {
            title: "S/N",
            dataIndex: 'posTerminal',
            key: 'posTerminal',
            width: "20px",
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => filterHandlers.byTerminalId()}
                    />
                    &nbsp;&nbsp;Terminal ID
                </span>                
            ),
            dataIndex: 'terminalId',
            key: 'terminalId',
            width: 10,
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => filterHandlers.byMerchantId()}
                    />
                    &nbsp;&nbsp;Merchant ID
                </span>                
            ),
            dataIndex: 'merchantId',
            key: 'merchantId',
            width: 10,
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => filterHandlers.byRrn()}
                    />
                    &nbsp;&nbsp;RRN
                </span>                
            ),
            dataIndex: 'rrn',
            key: 'rrn',
            width: "6px",
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => filterHandlers.byAmount()}
                    />
                    &nbsp;&nbsp;Amount
                </span>                
            ),
            dataIndex: 'amount',
            key: 'amount',
            width: 10,
        },
        {
            title: (
                <img src={process.env.PUBLIC_URL + 'img/calendar.svg'} 
                     alt="Date" 
                     style={{
                        width: "40px"
                     }}
                />
            ),
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: "20px",
        },
        {
            title: (
                <img src={process.env.PUBLIC_URL + 'img/info.svg'} 
                     alt="Status" 
                     style={{
                        width: "40px"
                     }}
                />
            ),
            dataIndex: 'statusCode',
            key: 'statusCode',
            width: "20px",
        },
        {
            title: (
                <img src={process.env.PUBLIC_URL + 'img/transactions.svg'} 
                     alt="Transaction type" 
                     style={{
                        width: "40px"
                     }}
                />
            ),
            dataIndex: 'transactionType',
            key: 'transactionType',
            width: "15px",
        },
        {
            title: (
                <img src={process.env.PUBLIC_URL + 'img/bank_1.svg'} 
                     alt="Bank" 
                     style={{
                        width: "40px"
                     }}
                />
            ),
            dataIndex: 'paymentSystem',
            key: 'paymentSystem',
            width: "10px",
        }
    ];

    const mccsColumns = [
        {
            title: (
                <img src={process.env.PUBLIC_URL + 'img/sharp.svg'} 
                     alt="ID" 
                     style={{
                        width: "20px"
                     }}
                />
            ),
            dataIndex: 'number',
            key: 'number',
            width: "5px",
        },
        {
            title: "Code",
            dataIndex: 'code',
            key: 'code',
            width: "7px",
        },{
            title: "Name",
            dataIndex: 'name',
            key: 'name',
            width: "45px",
        },
    ]

    const citiesColumns = [
        {
            title: (
                <img src={process.env.PUBLIC_URL + 'img/sharp.svg'} 
                     alt="ID" 
                     style={{
                        width: "20px"
                     }}
                />
            ),
            dataIndex: 'number',
            key: 'number',
            width: "5px",
        },
        {
            title: (
                <img src={process.env.PUBLIC_URL + 'img/arm_flag.svg'} 
                     alt="Name AM" 
                     style={{
                        width: "30px"
                     }}
                />
            ),
            dataIndex: 'name_am',
            key: 'name_am',
            width: "25px",
        },{
            title: (
                <img src={process.env.PUBLIC_URL + 'img/uk_flag.svg'} 
                     alt="Name EN" 
                     style={{
                        width: "30px"
                     }}
                />
            ),
            dataIndex: 'name_en',
            key: 'name_en',
            width: "25px",
        },
    ]

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
            title: 'Is active',
            dataIndex: 'is_active',
            key: 'is_active',
            width: 11,
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
                    <BsFillPencilFill style={{ color: "blue", cursor: "pointer" }} onClick={() => {
                        setCurrentData(record);
                        onClickEditButton(record);
                    }} />
                    <BsFillTrashFill style={{ color: "red", cursor: "pointer" }} onClick={() => {
                        setCurrentData(record);
                        onClickDeleteButton(record);
                    }} />
                </Space>
            )
        },
    ];

    const banksColumns = [
        {
            title: 'ID',
            width: 10,
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Short name',
            width: 14,
            dataIndex: 'short_name',
            key: 'short_name',
        },
        {
            title: 'Name AM',
            width: 14,
            dataIndex: 'name_am',
            key: 'name_am',
        },
        {
            title: 'Name RU',
            width: 14,
            dataIndex: 'name_ru',
            key: 'name_ru',
        },
        {
            title: 'Name EN',
            width: 14,
            dataIndex: 'name_en',
            key: 'name_en',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 25,
        },
        {
            title: 'Second email',
            dataIndex: 'secondEmail',
            key: 'secondEmail',
            width: 25,
        },
        {
            title: 'Is active',
            dataIndex: 'is_active',
            key: 'is_active',
            width: 11,
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            width: 30,
        },
        {
            title: 'Is owner',
            dataIndex: 'is_owner',
            key: 'is_owner',
            width: 11,
        },
        {
            title: 'Action',
            key: 'operation',
            width: 15,
            render: (record) => (
                <Space size="middle">
                    <BsFillPencilFill style={{ color: "blue", cursor: "pointer" }} onClick={() => {
                        setCurrentData(record);
                        onClickEditButton(record);
                    }} />
                    <BsFillTrashFill style={{ color: "red", cursor: "pointer" }} onClick={() => {
                        setCurrentData(record);
                        onClickDeleteButton(record);
                    }} />
                </Space>
            )
        },
    ]

    const data = [];

    let columns = [];

    if (whichTable === "users") {
        columns = usersColumns;

        for (let i = 0; i < datas.length; i++) {
            data.push({
                id: datas[i].id,
                username: datas[i].username,
                bank: datas[i].bank ? banks[datas[i].bank] : "FPS",
                email: datas[i].email,
                is_active: datas[i].is_active,
                role: datas[i].role
            });
        }
    }
    else if (whichTable === "terminals") columns = terminalsColumns;
    else if (whichTable === "transactions") columns = transactionsColumns;
    else if (whichTable === "mccs") columns = mccsColumns;
    else if (whichTable === "cities") columns = citiesColumns;
    else if (whichTable === "banks") columns = banksColumns;

    return (
        <Table
            columns={columns}
            dataSource={whichTable === "users" ? data : datas}
            pagination={false}
            size={size}
            sticky={{
                offsetHeader: 64,
            }}
            scroll={
                scrollBoth ? {
                    scrollToFirstRowOnChange: true,
                    y: (windowHeight < 950) ? 450 : 650,
                    x: minWidth
                } :
                scrollX ? {
                    scrollToFirstRowOnChange: true,
                    x: minWidth
                } : 
                scrollY ? {
                    scrollToFirstRowOnChange: true,
                    y: (windowHeight < 950) ? 450 : 650,
                } : null
            }
        />
    );
};
export default TableComponent;