import passport from "passport";
import { Request, Response, NextFunction } from "express";
import passportCustom, {VerifiedCallback} from "passport-custom";
import {User, UserDocument} from "../models/User";
import {NativeError} from "mongoose";
import {OAuth2Client} from "google-auth-library";

const client = new OAuth2Client("CLIENT ID");
const CustomStrategy = passportCustom.Strategy;

passport.serializeUser<any, any>((req, user: UserDocument, done) => {
    done(undefined, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err: NativeError, user: UserDocument) => done(err, user));
});

/**
 * Sign in using Google
 */
passport.use("google", new CustomStrategy(async (req: Request, done: VerifiedCallback): Promise<void >=> {
        try {
            const token = req.body.token;
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: "CLIENT ID"
            });

            const user: { email?: string, name?: string, picture?: string } = ticket.getPayload();

            User.findOne({email: user.email}, async (err: Error, userDoc: UserDocument): Promise<void> => {
                if (err) return done(err);
                if (!user) await User.create(userDoc);
                done(undefined, user); //This is the function in passport.authenticate cb
            });

        } catch (e) {
            done(e);
        }
    }
));

/**
 * Login Required middleware.
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401);
    res.json({success: false, error: "Unauthorized"});
};
