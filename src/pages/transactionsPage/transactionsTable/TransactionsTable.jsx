import "./TransactionsTable.css";
import { transactionsTableFields as columns } from "../../../constants/tableFields/transactionsTableFields";

const TransactionsTable = ({ transactions }) => {
    return (
        <>
            {transactions.length !== 0 &&
                <table>
                    <thead>
                        <tr>
                            {
                                columns.map(({ name }) => (
                                    <th key={ name }>{ name }</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.map((transaction) => {
                                return (
                                    <tr key={transaction.id} >
                                        {
                                            columns.map(({ key }) => (
                                                <td key={transaction[key + Math.E]}>{transaction[key]}</td>
                                            ))
                                        }
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

export default TransactionsTable;