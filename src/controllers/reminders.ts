import { Request, Response } from "express";
import { User, UserDocument } from "../models/User";
import { Reminder } from "../models/Reminder";
import { vaccineDueDays } from "../config/data";
import { getDateString } from "../util/getDateString";
import { scanReminders } from "../util/sendReminder";
import { VaccineType } from "./user";

export enum ReminderTypes {
    Dose2Due,
    Appointment,
    Notify,
}

export interface IReminderData {
    email?: string;
    type: ReminderTypes;
    date: string;
    message: string;
    center?: number;
    centername?: string;
}

export const getDose2DueDate = (
    dose1Date: string,
    vaccineType: VaccineType
): string => {
    const d = new Date(dose1Date);
    d.setDate(d.getDate() + vaccineDueDays[vaccineType]);
    return getDateString(d);
};

export const utilAddReminder = async (
    user: UserDocument,
    reminderData: IReminderData
): Promise<[boolean, string]> => {
    const alreadyReminder = await Reminder.findOne({
        email: user.email,
        type: reminderData.type,
        date: reminderData.date,
        center: reminderData.center,
    });
    if (alreadyReminder) return [false, "Reminder already added"];
    const res = await Reminder.create({
        email: user.email,
        type: reminderData.type,
        date: reminderData.date,
        message: reminderData.message,
        center: reminderData.center,
        centername: reminderData.centername,
    });
    console.log(res);
    return [true, "Added reminder successfully"];
};

export const utilRemoveReminder = async (
    id: string
): Promise<[boolean, string]> => {
    const res = await Reminder.findByIdAndRemove(id);
    console.log(res);
    return [true, "Reminder removed successfully"];
};

/**
 * Add reminder
 * @route /POST /account/reminder/add
 */

export const addReminder = async (
    req: Request,
    res: Response
): Promise<void> => {
    const [success, message] = await utilAddReminder(req.user as UserDocument, {
        type: req.body.type,
        date: req.body.date,
        message: req.body.message,
        center: req.body.center,
        centername: req.body.centername ? req.body.centername : "",
    });
    res.status(success ? 200 : 400);
    res.json(success ? { success, message } : { success, error: message });
};

/**
 * Remove Reminder
 * @route /DELETE /account/reminder/remove
 */

export const removeReminder = async (
    req: Request,
    res: Response
): Promise<void> => {
    const [success, message] = await utilRemoveReminder(req.body.id);
    res.status(success ? 200 : 400);
    res.json({ success, message });
};

/**
 * Get list of reminders
 * @route /GET /account/reminder/list
 */

export const listReminder = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { email } = req.user as UserDocument;
    const list = await Reminder.find({ email });
    res.status(200);
    res.json({ success: true, list });
};

/**
 * Only FOR TESTING
 * This will scan reminders and send if found
 * @route POST /triggerScanReminders
 */

export const triggerScanReminders = (req: Request, res: Response): void => {
    if (req.body.trigger) {
        scanReminders();
        res.status(200);
        res.json({
            success: true,
            message: "Triggered Scan Reminders Function",
        });
    } else {
        res.status(400);
        res.json({
            success: false,
            message: "Please set body field trigger to true (triggier: true",
        });
    }
};
