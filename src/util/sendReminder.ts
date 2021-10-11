import Vonage from "@vonage/server-sdk";
import axios from "axios";
import { Reminder, ReminderDocument } from "../models/Reminder";
import { ReminderTypes, utilRemoveReminder } from "../controllers/reminders";
import { User, UserDocument } from "../models/User";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const vonage = new Vonage({
    apiKey: process.env.VONAGE_APIKEY,
    apiSecret: process.env.VONAGE_APISECRET,
});

export const sendToTelegram = (telegram: string, message: string): void => {
    axios.get(
        `https://api.telegram.org/${process.env.TELEGRAMBOT_TOKEN}/sendMessage?chat_id=${telegram}&text=${message}`
    );
};

export const sendToSMS = (mobile: string, message: string): void => {
    const to = "91" + mobile;
    const from = "VACCINE";
    vonage.message.sendSms(from, to, message, {}, () => {
        console.log("Message sent");
    });
};

/**
 * @ReminderType.Notify
 * Check if vaccination slot is available at particular date and centre and notify user of availability
 */
export const checkAndNotify = (
    centre: number,
    date: string,
    telegram: string,
    mobile: string,
    message: string
): void => {
    axios
        .get(
            `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByCenter?center_id=${centre}&date=${date}`
        )
        .then((response: any) => {
            if (response.centers?.sessions) {
                for (const session of response.centers.session) {
                    if (session?.date === date) {
                        if (session?.available_capacity > 0) {
                            mobile?.length === 10 && sendToSMS(mobile, message);
                            telegram?.length > 2 &&
                                sendToTelegram(telegram, message);
                        }
                        break;
                    }
                }
            }
        });
};

/**
 * This will scan reminders to check if there is reminder to be send
 */
export const scanReminders = (): void => {
    Reminder.find({}, (err: Error, reminders: ReminderDocument[]) => {
        reminders.forEach((reminder) => {
            const today = new Date();
            today.setHours(0);
            today.setMinutes(0);
            const reminderDate = new Date(
                reminder.date.split("-").reverse().join("-")
            );
            //console.log(today, reminderDate);
            if (today > reminderDate) {
                console.log("Deleting reminder");
                return utilRemoveReminder(reminder._id);
            } else if (
                today.getDate() === reminderDate.getDate() &&
                reminderDate.getMonth() === today.getMonth() &&
                reminderDate.getFullYear() === today.getFullYear()
            ) {
                User.findOne(
                    { email: reminder.email },
                    (error: Error, user: UserDocument) => {
                        if (user) {
                            if (
                                user.mobile?.length === 10 ||
                                user.telegram?.length > 2
                            ) {
                                switch (reminder.type) {
                                    case ReminderTypes.Dose2Due:
                                    case ReminderTypes.Appointment:
                                        user.mobile?.length === 10 &&
                                            sendToSMS(
                                                user.mobile,
                                                reminder.message
                                            );
                                        user.telegram?.length > 2 &&
                                            sendToTelegram(
                                                user.telegram,
                                                reminder.message
                                            );
                                        break;
                                    case ReminderTypes.Notify:
                                        checkAndNotify(
                                            reminder.center,
                                            reminder.date,
                                            user.telegram,
                                            user.mobile,
                                            reminder.message
                                        );
                                        break;
                                }
                            }
                        }
                    }
                );
            }
        });
    });
};

/**
 * This will trigger scanReminder every 5 hours
 */
export const intervalCheckNSendReminders = (): void => {
    setInterval(() => scanReminders(), 60 * 60 * 5 * 1000); //every 5 hours
};
