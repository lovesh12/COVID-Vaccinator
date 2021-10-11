"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_custom_1 = __importDefault(require("passport-custom"));
const User_1 = require("../models/User");
const google_auth_library_1 = require("google-auth-library");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT);
const CustomStrategy = passport_custom_1.default.Strategy;
passport_1.default.serializeUser((req, user, done) => {
    done(undefined, user);
});
passport_1.default.deserializeUser((user, done) => {
    User_1.User.findOne({ email: user.email }, (err, user) => done(err, user));
});
/**
 * Sign in using Google
 */
passport_1.default.use("google", new CustomStrategy((req, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token;
        console.log(token);
        console.log(process.env.GOOGLE_CLIENT);
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT,
        });
        const { email, name, picture, } = ticket.getPayload();
        const user = { email, name, picture };
        User_1.User.findOne({ email }, (err, userDoc) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Reaching here");
            if (err)
                return done(err);
            if (!userDoc)
                yield User_1.User.create(user);
            done(undefined, user); //This is the function in passport.authenticate cb
        }));
    }
    catch (e) {
        done(e);
    }
})));
/**
 * Login Required middleware.
 */
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401);
    res.json({ success: false, error: "Unauthorized. Please login" });
};
exports.isAuthenticated = isAuthenticated;
