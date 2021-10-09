function getDate() {
    const dateObj = new Date();
    const dd = dateObj.getDate().toString().padStart(2, '0');
    const mm = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const yyyy = dateObj.getFullYear();

    return `${yyyy}-${mm}-${dd}`;

}

export default getDate;