import dayjs from "dayjs";

export const changeTransactionsFieldsForView = (items, currentPage, pageSize, reveresed = false, count) => {
    const addingHours =  - new Date().getTimezoneOffset() / 60;

    items.map((item) => {
        if (!reveresed) {
            item.number = items.indexOf(item) + 1 + (currentPage - 1) * pageSize;
        } else {
            item.number = count - items.indexOf(item) - (currentPage - 1) * pageSize;
        }        

        const amount = String(item.amount);
        item.amount = amount.slice(0, amount.length - 2) + "," + amount.slice(amount.length - 2);

        item.createdAt = dayjs(item.createdAt).add(addingHours, "hour").format("DD-MM-YYYY HH:mm:ss");
    });

    return items;
};