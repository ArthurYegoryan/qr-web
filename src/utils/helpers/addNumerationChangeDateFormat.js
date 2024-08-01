export const addNumerationChangeDateFormat = (items, currentPage, pageSize) => {
    items.map((item) => {
        item.number = items.indexOf(item) + 1 + (currentPage - 1) * pageSize;
        item.createdAt = item.createdAt.slice(0, 10) + " " + item.createdAt.slice(11, 19);
        if (item.inactiveDate) {
            item.inactiveDate = item.inactiveDate.slice(0, 10) + " " + item.inactiveDate.slice(11, 19);
        }
    });

    return items;
};