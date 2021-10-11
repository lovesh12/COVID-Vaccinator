import passport from "passport";
import { Request, Response, NextFunction } from "express";
import passportCustom, { VerifiedCallback } from "passport-custom";
import { User, UserDocument } from "../models/User";
import { NativeError } from "mongoose";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
const CustomStrategy = passportCustom.Strategy;

passport.serializeUser<any, any>(
    (req, user: UserDocument, done: VerifiedCallback) => {
        done(undefined, user);
    }
);

passport.deserializeUser((user: UserDocument, done: VerifiedCallback) => {
    User.findOne(
        { email: user.email },
        (err: NativeError, user: UserDocument) => done(err, user)
    );
});

/**
 * Sign in using Google
 */
passport.use(
    "google",
    new CustomStrategy(
        async (req: Request, done: VerifiedCallback): Promise<void> => {
            try {
                const token = req.body.token;
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: process.env.GOOGLE_CLIENT,
                });

                const {
                    email,
                    name,
                    picture,
                }: { email?: string; name?: string; picture?: string } =
                    ticket.getPayload();
                const user = { email, name, picture };

                User.findOne(
                    { email },
                    async (
                        err: NativeError,
                        userDoc: UserDocument
                    ): Promise<void> => {
                        console.log("Reaching here");
                        if (err) return done(err);
                        if (!userDoc) await User.create(user);
                        done(undefined, user); //This is the function in passport.authenticate cb
                    }
                );
            } catch (e) {
                done(e);
            }
        }
    )
);

/**
 * Login Required middleware.
 */
export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401);
    res.json({ success: false, error: "Unauthorized. Please login" });
};
