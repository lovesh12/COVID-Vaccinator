"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
/**
 * Home Page
 * @route GET /
 */
const index = (req, res) => {
    res.render("home", {
        title: "COVID Vaccinator"
    });
};
exports.index = index;
