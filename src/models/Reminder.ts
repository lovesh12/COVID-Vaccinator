import mongoose from "mongoose";
import { ReminderTypes } from "../controllers/reminders";

export type ReminderDocument = mongoose.Document & {
    _id?: mongoose.Schema.Types.ObjectId;
    email?: string;
    type: ReminderTypes;
    date: string;
    message: string;
    center?: number;
    centername?: string;
};

const reminderSchema = new mongoose.Schema<ReminderDocument>({
    email: String,
    type: Number,
    date: String,
    message: String,
    center: Number,
    centername: String,
});

export const Reminder = mongoose.model<ReminderDocument>(
    "Reminder",
    reminderSchema
);
