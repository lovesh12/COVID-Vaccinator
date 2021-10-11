import { Request, Response } from "express";
import passport from "passport";
import { User, UserDocument } from "../models/User";
import { getDose2DueDate, ReminderTypes, utilAddReminder } from "./reminders";
import axios from "axios";

export interface DoseInfo {
    id: number;
    name: string;
    taken: boolean;
    date: string;
}

export const utilTelegramDone = (updateId: string): void => {
    axios.get(
        "https://api.telegram.org/bot2018543506:AAG_aUhCSosvCXLkRGCXszid1SkNB7XvCfc/getUpdates?offset=" +
            (updateId + 1)
    );
};

/**
 * Login endpoint
 * @route GET /auth/google
 */

export const googleAuth = (req: Request, res: Response): void => {
    passport.authenticate(
        "google",
        (error: Error, user: UserDocument): Response => {
            if (error) {
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
        }
    )(req, res);
};

export const logout = (req: Request): void => {
    req.logout();
};

/**
 * Get doses info
 * @route GET /account/getDoses
 */

export const getDoses = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as UserDocument;
    res.status(200);
    let dosesToShow: DoseInfo[] = [];
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
};

/**
 * Set doses taken info
 * @route POST /account/setDoses
 */

export const setDoses = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.user as UserDocument;
    const dosesData = req.body.doses;
    if (dosesData["1"]) {
        console.log("Saving 1");
        await User.updateOne(
            { email },
            { d1: dosesData["1"].enabled, d1Date: dosesData["1"].date }
        );
        const d2DueDate = getDose2DueDate(dosesData["1"].date, "covishield");
        await utilAddReminder(req.user as UserDocument, {
            type: ReminderTypes.Dose2Due,
            date: d2DueDate,
            message: "Hello",
        });
    }
    if (dosesData["2"]) {
        console.log("Saving 2");
        await User.updateOne(
            { email },
            { d2: dosesData["2"].enabled, d2Date: dosesData["2"].date }
        );
    }
    res.status(200);
    res.json({ success: true });
};

/**
 * Get vaccination certificate list
 * @route GET /account/certificates/status
 * @vaccinationStatus
 * 0 - Not Vaccinated
 * 1 - Partially Vaccinated
 * 2 - Fully Vaccinated
 */

export const certificatesStatus = async (
    req: Request,
    res: Response
): Promise<void> => {
    const user = req.user as UserDocument;
    let vaccinationStatus = 0;
    if (user.d2) vaccinationStatus = 2;
    else if (user.d1) vaccinationStatus = 1;
    res.status(200);
    res.json({ success: true, vaccinationStatus });
};

/**
 * Verify Telegram message to bot
 * @route POST /account/telegram/update
 */

export const verifyTelegram = async (
    req: Request,
    res: Response
): Promise<void> => {
    const username: string = req.body.username;
    const { email } = req.user as UserDocument;
    const { data }: any = await axios.get(
        "https://api.telegram.org/bot2018543506:AAG_aUhCSosvCXLkRGCXszid1SkNB7XvCfc/getUpdates"
    );
    console.log(data);
    let found: boolean | string = false;

    data.result.forEach((r: any) => {
        if (r.message.from.username.toLowerCase() === username.toLowerCase()) {
            found = r.message.chat.id;
            utilTelegramDone(r.update_id);
            return;
        }
    });

    if (found !== false) {
        await User.updateOne({ email }, { telegram: found });
        res.status(200);
        res.json({ success: true, message: "Successfully added Telegram" });
    } else {
        res.status(400);
        res.json({
            success: false,
            message: "Couldn't find your message to bot",
        });
    }
};

/**
 * Add mobile number
 * @route /POST /account/mobile/update
 */

export const addMobile = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.user as UserDocument;
    const mobile: string = req.body.mobile;
    await User.updateOne({ email }, { mobile });
    res.status(200);
    res.json({ success: true, message: "Successfully added mobile" });
};

/**
 * Get reminder config for mobile, telegram and email
 * @route /GET /account/reminder/config
 */

export const getReminderConfig = (req: Request, res: Response): void => {
    const { telegram, email, mobile } = req.user as UserDocument;
    res.json({ success: true, telegram, mobile, email });
};
