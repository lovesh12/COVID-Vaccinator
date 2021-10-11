export const getDateString = (
    date: Date,
    inverted: boolean = false
): string => {
    const dd = date.getDate().toString().padStart(2, "0");
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const yyyy = date.getFullYear();

    return inverted ? `${yyyy}-${mm}-${dd}` : `${dd}-${mm}-${yyyy}`;
};
