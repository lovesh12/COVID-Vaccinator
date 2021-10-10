import { Request, Response } from "express";
import {User, UserDocument} from "../models/User";
import {Reminder, ReminderDocument} from "../models/Reminder";
import {vaccineDueDays} from "../config/data";
import {getDateString} from "../util/getDateString";

export enum ReminderTypes {
    Dose2Due,
    Appointment,
    Notify,
}

export interface IReminderData {
    type: ReminderTypes,
    date: string,
    time: string,
    message: string,
}

export const getDose2DueDate = (dose1Date: string, vaccineType: string): string => {
    const d = new Date(dose1Date);
    vaccineType = vaccineType.toLowerCase();
    d.setDate(d.getDate() + vaccineDueDays[vaccineType]);
    return getDateString(d);
};

export const utilAddReminder = async (user: UserDocument, reminderData: IReminderData): Promise<[boolean, string]> => {
    const res = await Reminder.create({
        email: user.email,
        type: reminderData.type,
        date: reminderData.date,
        time: reminderData.time,
        message: reminderData.message
    });
    console.log(res);
    return [true, "Added reminder successfully"];
};

export const utilRemoveReminder = async (id: string): Promise<[boolean, string]> => {
    const res = await Reminder.findByIdAndRemove(id);
    console.log(res);
    return [true, "Reminder removed successfully"];
};

