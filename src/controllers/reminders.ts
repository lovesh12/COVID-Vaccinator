import { Request, Response } from "express";
import { User, UserDocument } from "../models/User";
import { Reminder } from "../models/Reminder";
import { vaccineDueDays } from "../config/data";
import { getDateString } from "../util/getDateString";
import { scanReminders } from "../util/sendReminder";

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
    centre?: number;
}

export const getDose2DueDate = (
    dose1Date: string,
    vaccineType: string
): string => {
    const d = new Date(dose1Date);
    vaccineType = vaccineType.toLowerCase();
    d.setDate(d.getDate() + vaccineDueDays[vaccineType]);
    return getDateString(d);
};

export const utilAddReminder = async (
    user: UserDocument,
    reminderData: IReminderData
): Promise<[boolean, string]> => {
    const res = await Reminder.create({
        email: user.email,
        type: reminderData.type,
        date: reminderData.date,
        message: reminderData.message,
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
        centre: req.body.centre,
    });
    res.status(success ? 200 : 400);
    res.json({ success, message });
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
