export const addNumeration = (items, currentPage, pageSize) => {
    items.map((item) => {
        item.number = items.indexOf(item) + 1 + (currentPage - 1) * pageSize;
    });

    return items;
};