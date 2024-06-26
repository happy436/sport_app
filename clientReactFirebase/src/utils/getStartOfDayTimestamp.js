export const getStartOfDayTimestamp = (date = Date.now()) => {
    const targetDate = new Date(date);
    const timestamp = new Date(targetDate.setHours(0, 0, 0, 0)).getTime();
    return timestamp;
};