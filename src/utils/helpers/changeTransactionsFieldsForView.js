export const changeTransactionsFieldsForView = (items, currentPage, pageSize) => {
    items.map((item) => {
        item.number = items.indexOf(item) + 1 + (currentPage - 1) * pageSize;

        const amount = String(item.amount);
        item.amount = amount.slice(0, amount.length - 2) + "," + amount.slice(amount.length - 2);

        item.createdAt = item.createdAt.slice(0, 10) + " " + item.createdAt.slice(11, 19);
    });

    return items;
};