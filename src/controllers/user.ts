import { Request, Response } from "express";
import passport from "passport";
import {User, UserDocument} from "../models/User";

export interface DosesInfo {
    d1: boolean,
    d2: boolean,
    d1Date: string,
    d2Date: string,
}

/**
 * Login endpoint
 * @route GET /auth/google
 */

export const googleAuth = (req: Request, res: Response): void => {
    passport.authenticate("google", (error: Error, user: UserDocument): Response => {
        if (error) {
            res.status(401);
            return res.json({success: false, error: "Authentication Failed!"});
        }
        req.logIn(user, () => {
            res.status(201);
            return res.json({success: true, user});
        });
    })(req, res);
};

export const logout = (req: Request): void => {
    req.logout();
};

/**
 * Set doses taken info
 * @route POST /account/setDoses
 */

export const setDoses = async (req: Request, res: Response): Promise<void> => {
    const {d1, d2, d1Date, d2Date}: DosesInfo = req.body;
    const user = req.user as UserDocument;
    const updateRes = await User.updateOne({email: user.email}, {d1, d2, d1Date, d2Date});
    console.log(updateRes);
    res.status(updateRes.modifiedCount > 0 ? 200 : 400);
    res.json({success: Boolean(updateRes.modifiedCount > 0)});
};