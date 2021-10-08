"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDoses = exports.googleAuth = void 0;
const passport_1 = __importDefault(require("passport"));
/**
 * Login endpoint
 * @route GET /auth/google
 */
const googleAuth = (req, res) => {
    passport_1.default.authenticate("google", (error, user) => {
        if (error) {
            res.status(401);
            return res.json({ success: false, error: "Authentication Failed!" });
        }
        req.logIn(user, () => {
            res.status(201);
            return res.json({ success: true, user });
        });
    })(req, res);
};
exports.googleAuth = googleAuth;
/**
 * Set doses taken info
 * @route POST /account/setDoses
 */
const setDoses = (req, res) => {
    res.json({ user: req.user });
};
exports.setDoses = setDoses;
