import express, { Request, Response } from "express";
import session from "express-session";
import path from "path";
import bodyParser from "body-parser";
import compression from "compression";
import passport from "passport";
import mongoose from "mongoose";

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as userController from "./controllers/user";
import { isAuthenticated } from "./config/passport";
import * as reminderController from "./controllers/reminders";
import { getCertificate } from "./controllers/user";

//Create express app
const app = express();

//Express configuration
app.set("port", process.env.PORT || 3001);
app.set("views", path.join(__dirname, "../views"));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    express.static(path.join(__dirname, "../client/build"), {
        maxAge: 31557600000,
    })
);

app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: "SESSION_SECRET",
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
const mongoUrl = "mongodb://localhost:27017/covid";

mongoose
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    })
    .catch((err) => {
        console.log(
            `MongoDB connection error. Please make sure MongoDB is running. ${err}`
        );
        // process.exit();
    });

/**
 * Primary app routes
 */
app.get("/", homeController.index);
app.post("/auth/google", userController.googleAuth);
app.post("/logout", userController.logout);
app.get("/account/getDoses", isAuthenticated, userController.getDoses);
app.post("/account/setDoses", isAuthenticated, userController.setDoses);
app.get(
    "/account/certificates/status",
    isAuthenticated,
    userController.certificatesStatus
);
app.post(
    "/account/reminder/add",
    isAuthenticated,
    reminderController.addReminder
);
app.delete(
    "/account/reminder/remove",
    isAuthenticated,
    reminderController.removeReminder
);
app.get(
    "/account/reminder/list",
    isAuthenticated,
    reminderController.listReminder
);
app.post(
    "/account/telegram/update",
    isAuthenticated,
    userController.verifyTelegram
);
app.post("/account/mobile/update", isAuthenticated, userController.addMobile);
app.get(
    "/account/reminder/config",
    isAuthenticated,
    userController.getReminderConfig
);
app.get("/account/certificate", isAuthenticated, getCertificate);

//ONLY FOR TESTING PURPOSE
app.post("/triggerScanReminders", reminderController.triggerScanReminders);

// All other GET requests not handled before will return our React app
app.get("*", (req: Request, res: Response): void => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

export default app;
