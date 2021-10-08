import { Request, Response } from "express";
import passport from "passport";
import {UserDocument} from "../models/User";

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

/**
 * Set doses taken info
 * @route POST /account/setDoses
 */

export const setDoses = (req: Request, res: Response): void => {
    res.json({user: req.user});
};