/**
 * @param type
 * 0 = dd-mm-yyy
 * 1 = yyyy-mm-dd
 */

function getDate(type) {
    const dateObj = new Date();
    const dd = dateObj.getDate().toString().padStart(2, '0');
    const mm = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const yyyy = dateObj.getFullYear();

    return !type ? `${dd}-${mm}-${yyyy}` : `${yyyy}-${mm}-${dd}`;

}

export default getDate;