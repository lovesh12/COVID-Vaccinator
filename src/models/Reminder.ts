import mongoose from "mongoose";
import {ReminderTypes} from "../controllers/reminders";

export type ReminderDocument = mongoose.Document & {
    _id?: string,
    email?: string,
    type: ReminderTypes,
    date: string,
    time: string,
    message: string,
}

const reminderSchema = new mongoose.Schema<ReminderDocument>(
    {
        email: String,
        type: Number,
        date: String,
        time: String,
        message: String,
    },
);

export const Reminder = mongoose.model<ReminderDocument>("Reminder", reminderSchema);