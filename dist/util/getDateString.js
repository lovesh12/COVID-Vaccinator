"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateString = void 0;
const getDateString = (date, inverted = false) => {
    const dd = date.getDate().toString().padStart(2, "0");
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const yyyy = date.getFullYear();
    return inverted ? `${yyyy}-${mm}-${dd}` : `${dd}-${mm}-${yyyy}`;
};
exports.getDateString = getDateString;
