"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCertificate = exports.getReminderConfig = exports.addMobile = exports.verifyTelegram = exports.certificatesStatus = exports.setDoses = exports.getDoses = exports.logout = exports.googleAuth = exports.utilTelegramDone = void 0;
const passport_1 = __importDefault(require("passport"));
const User_1 = require("../models/User");
const reminders_1 = require("./reminders");
const axios_1 = __importDefault(require("axios"));
const createCertificate_1 = __importDefault(require("../util/createCertificate"));
const stream_1 = __importDefault(require("stream"));
const utilTelegramDone = (updateId) => {
    axios_1.default.get(`https://api.telegram.org/${process.env.TELEGRAMBOT_TOKEN}/getUpdates?offset=` +
        (updateId + 1));
};
exports.utilTelegramDone = utilTelegramDone;
/**
 * Login endpoint
 * @route GET /auth/google
 */
const googleAuth = (req, res) => {
    passport_1.default.authenticate("google", (error, user) => {
        if (error) {
            console.log(error);
            res.status(401);
            return res.json({
                success: false,
                error: "Authentication Failed!",
            });
        }
        req.logIn(user, () => {
            res.status(201);
            return res.json({ success: true, user });
        });
    })(req, res);
};
exports.googleAuth = googleAuth;
const logout = (req) => {
    req.logout();
};
exports.logout = logout;
/**
 * Get doses info
 * @route GET /account/getDoses
 */
const getDoses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    res.status(200);
    let dosesToShow = [];
    if (!user.d1)
        dosesToShow = [
            { id: 1, name: "Dose 1", taken: user.d1, date: user.d1Date },
            { id: 2, name: "Dose 2", taken: user.d2, date: user.d2Date },
        ];
    else if (!user.d2)
        dosesToShow = [
            { id: 2, name: "Dose 2", taken: user.d2, date: user.d2Date },
        ];
    res.json({ success: true, doses: dosesToShow });
});
exports.getDoses = getDoses;
/**
 * Set doses taken info
 * @route POST /account/setDoses
 */
const setDoses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const dosesData = req.body.doses;
    const vaccine = req.body.vaccine;
    if (dosesData["1"]) {
        console.log("Saving 1");
        yield User_1.User.updateOne({ email }, { d1: dosesData["1"].enabled, d1Date: dosesData["1"].date });
        const d2DueDate = (0, reminders_1.getDose2DueDate)(dosesData["1"].date, vaccine);
        yield (0, reminders_1.utilAddReminder)(req.user, {
            type: reminders_1.ReminderTypes.Dose2Due,
            date: d2DueDate,
            message: `Your second dose for ${vaccine === 1 /* COVAXIN */ ? "COVAIN" : "COVISHIELD"} is due on ${d2DueDate}`,
        });
    }
    if (dosesData["2"]) {
        console.log("Saving 2");
        yield User_1.User.updateOne({ email }, { d2: dosesData["2"].enabled, d2Date: dosesData["2"].date });
    }
    res.status(200);
    res.json({ success: true });
});
exports.setDoses = setDoses;
/**
 * Get vaccination certificate list
 * @route GET /account/certificates/status
 * @vaccinationStatus
 * 0 - Not Vaccinated
 * 1 - Partially Vaccinated
 * 2 - Fully Vaccinated
 */
const certificatesStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    let vaccinationStatus = 0;
    if (user.d2)
        vaccinationStatus = 2;
    else if (user.d1)
        vaccinationStatus = 1;
    res.status(200);
    res.json({ success: true, vaccinationStatus });
});
exports.certificatesStatus = certificatesStatus;
/**
 * Verify Telegram message to bot
 * @route POST /account/telegram/update
 */
const verifyTelegram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const { email } = req.user;
    const { data } = yield axios_1.default.get(`https://api.telegram.org/${process.env.TELEGRAMBOT_TOKEN}/getUpdates`);
    console.log(data);
    let found = false;
    data.result.forEach((r) => {
        if (r.message.from.username.toLowerCase() === username.toLowerCase()) {
            found = r.message.chat.id;
            (0, exports.utilTelegramDone)(r.update_id);
            return;
        }
    });
    if (found !== false) {
        yield User_1.User.updateOne({ email }, { telegram: found });
        res.status(200);
        res.json({ success: true, message: "Successfully added Telegram" });
    }
    else {
        res.status(400);
        res.json({
            success: false,
            error: "Couldn't find your message to bot",
        });
    }
});
exports.verifyTelegram = verifyTelegram;
/**
 * Add mobile number
 * @route /POST /account/mobile/update
 */
const addMobile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const mobile = req.body.mobile;
    yield User_1.User.updateOne({ email }, { mobile });
    res.status(200);
    res.json({ success: true, message: "Successfully added mobile" });
});
exports.addMobile = addMobile;
/**
 * Get reminder config for mobile, telegram and email
 * @route /GET /account/reminder/config
 */
const getReminderConfig = (req, res) => {
    const { telegram, email, mobile } = req.user;
    res.json({ success: true, telegram, mobile, email });
};
exports.getReminderConfig = getReminderConfig;
/**
 * Get vaccination Certificate
 * @route /GET /account/certificate
 */
const getCertificate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, picture, d1, d2 } = req.user;
    let vaccinationStatus;
    if (d2)
        vaccinationStatus = "Fully Vaccinated";
    else if (d1)
        vaccinationStatus = "Partially Vaccinated";
    else
        vaccinationStatus = "Not Vaccinated";
    const pdfBuffer = yield (0, createCertificate_1.default)(name, email, picture, vaccinationStatus);
    const bufferStream = new stream_1.default.PassThrough();
    bufferStream.end(Buffer.from(pdfBuffer));
    res.contentType("application/pdf");
    bufferStream.pipe(res);
});
exports.getCertificate = getCertificate;
