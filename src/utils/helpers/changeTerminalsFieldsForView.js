import dayjs from "dayjs";

export const changeTerminalsFieldsForView = (items, currentPage, pageSize) => {
    const addingHours =  - new Date().getTimezoneOffset() / 60;

    items.map((item) => {
        item.number = items.indexOf(item) + 1 + (currentPage - 1) * pageSize;
        item.createdAt = dayjs(item.createdAt).add(addingHours, "hour").format("DD-MM-YYYY HH:mm:ss");
        if (item.inactiveDate) {
            item.inactiveDate = dayjs(item.createdAt).add(addingHours, "hour").format("DD-MM-YYYY HH:mm:ss");
        }
    });

    return items;
};