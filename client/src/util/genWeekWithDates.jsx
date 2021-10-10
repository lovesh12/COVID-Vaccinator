function getDateFormat(date) {
    const dd = date.getDate().toString().padStart(2, '0');
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const yyyy = date.getFullYear();

    return `${dd}-${mm}-${yyyy}`;

}

function genWeekWithDates(vaccines) {
    const arr = {};
    for(let i=0; i<7; i++) {
        let date = new Date();
        date.setDate(date.getDate() + i)
        arr[getDateFormat(date)] = {
            date: getDateFormat(date),
            available: false,
            covishield: null,
            covaxin: null,

        }
    }
    vaccines.forEach((vaccine) => {
        if (vaccine.vaccine === "COVISHIELD") {
            arr[vaccine.date].covishield = vaccine
            arr[vaccine.date].available = true;
        }
        else if (vaccine.vaccine === "COVAXIN") {
            arr[vaccine.date].covaxin = vaccine
            arr[vaccine.date].available = true;
        }
    })
    return arr;
}

export default genWeekWithDates;