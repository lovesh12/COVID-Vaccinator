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
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerScanReminders = exports.listReminder = exports.removeReminder = exports.addReminder = exports.utilRemoveReminder = exports.utilAddReminder = exports.getDose2DueDate = exports.ReminderTypes = void 0;
const Reminder_1 = require("../models/Reminder");
const data_1 = require("../config/data");
const getDateString_1 = require("../util/getDateString");
const sendReminder_1 = require("../util/sendReminder");
var ReminderTypes;
(function (ReminderTypes) {
    ReminderTypes[ReminderTypes["Dose2Due"] = 0] = "Dose2Due";
    ReminderTypes[ReminderTypes["Appointment"] = 1] = "Appointment";
    ReminderTypes[ReminderTypes["Notify"] = 2] = "Notify";
})(ReminderTypes = exports.ReminderTypes || (exports.ReminderTypes = {}));
const getDose2DueDate = (dose1Date, vaccineType) => {
    const d = new Date(dose1Date);
    d.setDate(d.getDate() + data_1.vaccineDueDays[vaccineType]);
    return (0, getDateString_1.getDateString)(d);
};
exports.getDose2DueDate = getDose2DueDate;
const utilAddReminder = (user, reminderData) => __awaiter(void 0, void 0, void 0, function* () {
    const alreadyReminder = yield Reminder_1.Reminder.findOne({
        email: user.email,
        type: reminderData.type,
        date: reminderData.date,
        center: reminderData.center,
    });
    if (alreadyReminder)
        return [false, "Reminder already added"];
    const res = yield Reminder_1.Reminder.create({
        email: user.email,
        type: reminderData.type,
        date: reminderData.date,
        message: reminderData.message,
        center: reminderData.center,
        centername: reminderData.centername,
    });
    console.log(res);
    return [true, "Added reminder successfully"];
});
exports.utilAddReminder = utilAddReminder;
const utilRemoveReminder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Reminder_1.Reminder.findByIdAndRemove(id);
    console.log(res);
    return [true, "Reminder removed successfully"];
});
exports.utilRemoveReminder = utilRemoveReminder;
/**
 * Add reminder
 * @route /POST /account/reminder/add
 */
const addReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [success, message] = yield (0, exports.utilAddReminder)(req.user, {
        type: req.body.type,
        date: req.body.date,
        message: req.body.message,
        center: req.body.center,
        centername: req.body.centername ? req.body.centername : "",
    });
    res.status(success ? 200 : 400);
    res.json(success ? { success, message } : { success, error: message });
});
exports.addReminder = addReminder;
/**
 * Remove Reminder
 * @route /DELETE /account/reminder/remove
 */
const removeReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [success, message] = yield (0, exports.utilRemoveReminder)(req.body.id);
    res.status(success ? 200 : 400);
    res.json({ success, message });
});
exports.removeReminder = removeReminder;
/**
 * Get list of reminders
 * @route /GET /account/reminder/list
 */
const listReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const list = yield Reminder_1.Reminder.find({ email });
    res.status(200);
    res.json({ success: true, list });
});
exports.listReminder = listReminder;
/**
 * Only FOR TESTING
 * This will scan reminders and send if found
 * @route POST /triggerScanReminders
 */
const triggerScanReminders = (req, res) => {
    if (req.body.trigger) {
        (0, sendReminder_1.scanReminders)();
        res.status(200);
        res.json({
            success: true,
            message: "Triggered Scan Reminders Function",
        });
    }
    else {
        res.status(400);
        res.json({
            success: false,
            message: "Please set body field trigger to true (trigger: true",
        });
    }
};
exports.triggerScanReminders = triggerScanReminders;
