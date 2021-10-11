"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.intervalCheckNSendReminders = exports.scanReminders = exports.checkAndNotify = exports.sendToSMS = exports.sendToTelegram = void 0;
const server_sdk_1 = __importDefault(require("@vonage/server-sdk"));
const axios_1 = __importDefault(require("axios"));
const Reminder_1 = require("../models/Reminder");
const reminders_1 = require("../controllers/reminders");
const User_1 = require("../models/User");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
const vonage = new server_sdk_1.default({
    apiKey: process.env.VONAGE_APIKEY,
    apiSecret: process.env.VONAGE_APISECRET,
});
const sendToTelegram = (telegram, message) => {
    axios_1.default.get(`https://api.telegram.org/${process.env.TELEGRAMBOT_TOKEN}/sendMessage?chat_id=${telegram}&text=${message}`);
};
exports.sendToTelegram = sendToTelegram;
const sendToSMS = (mobile, message) => {
    const to = "91" + mobile;
    const from = "VACCINE";
    vonage.message.sendSms(from, to, message, {}, () => {
        console.log("Message sent");
    });
};
exports.sendToSMS = sendToSMS;
/**
 * @ReminderType.Notify
 * Check if vaccination slot is available at particular date and centre and notify user of availability
 */
const checkAndNotify = (centre, date, telegram, mobile, message) => {
    axios_1.default
        .get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByCenter?center_id=${centre}&date=${date}`)
        .then((response) => {
        var _a;
        if ((_a = response.centers) === null || _a === void 0 ? void 0 : _a.sessions) {
            for (const session of response.centers.session) {
                if ((session === null || session === void 0 ? void 0 : session.date) === date) {
                    if ((session === null || session === void 0 ? void 0 : session.available_capacity) > 0) {
                        (mobile === null || mobile === void 0 ? void 0 : mobile.length) === 10 && (0, exports.sendToSMS)(mobile, message);
                        (telegram === null || telegram === void 0 ? void 0 : telegram.length) > 2 &&
                            (0, exports.sendToTelegram)(telegram, message);
                    }
                    break;
                }
            }
        }
    });
};
exports.checkAndNotify = checkAndNotify;
/**
 * This will scan reminders to check if there is reminder to be send
 */
const scanReminders = () => {
    Reminder_1.Reminder.find({}, (err, reminders) => {
        reminders.forEach((reminder) => {
            const today = new Date();
            today.setHours(0);
            today.setMinutes(0);
            const reminderDate = new Date(reminder.date.split("-").reverse().join("-"));
            //console.log(today, reminderDate);
            if (today > reminderDate) {
                console.log("Deleting reminder");
                return (0, reminders_1.utilRemoveReminder)(reminder._id);
            }
            else if (today.getDate() === reminderDate.getDate() &&
                reminderDate.getMonth() === today.getMonth() &&
                reminderDate.getFullYear() === today.getFullYear()) {
                User_1.User.findOne({ email: reminder.email }, (error, user) => {
                    var _a, _b, _c, _d;
                    if (user) {
                        if (((_a = user.mobile) === null || _a === void 0 ? void 0 : _a.length) === 10 ||
                            ((_b = user.telegram) === null || _b === void 0 ? void 0 : _b.length) > 2) {
                            switch (reminder.type) {
                                case reminders_1.ReminderTypes.Dose2Due:
                                case reminders_1.ReminderTypes.Appointment:
                                    ((_c = user.mobile) === null || _c === void 0 ? void 0 : _c.length) === 10 &&
                                        (0, exports.sendToSMS)(user.mobile, reminder.message);
                                    ((_d = user.telegram) === null || _d === void 0 ? void 0 : _d.length) > 2 &&
                                        (0, exports.sendToTelegram)(user.telegram, reminder.message);
                                    break;
                                case reminders_1.ReminderTypes.Notify:
                                    (0, exports.checkAndNotify)(reminder.center, reminder.date, user.telegram, user.mobile, reminder.message);
                                    break;
                            }
                        }
                    }
                });
            }
        });
    });
};
exports.scanReminders = scanReminders;
/**
 * This will trigger scanReminder every 5 hours
 */
const intervalCheckNSendReminders = () => {
    setInterval(() => (0, exports.scanReminders)(), 60 * 60 * 5 * 1000); //every 5 hours
};
exports.intervalCheckNSendReminders = intervalCheckNSendReminders;
