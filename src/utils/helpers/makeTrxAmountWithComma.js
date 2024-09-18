export const makeTrxAmountWithComma = (transactions) => {
    transactions.map((transaction) => {
        const amount = String(transaction.amount);
        transaction.amount = amount.slice(0, amount.length - 2) + "," + amount.slice(amount.length - 2);
    });

    return transactions;
};