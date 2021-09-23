export const getChatTime = date => {
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${hour}:${minutes} ${hour > 12 ? "PM" : "AM"}`;
};

export const setDateChat = date => {
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const dateNow = date.getDate();

    return `${year}-${month}-${dateNow}`;
};