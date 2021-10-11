"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
// Controllers (route handlers)
const homeController = __importStar(require("./controllers/home"));
const userController = __importStar(require("./controllers/user"));
const passport_2 = require("./config/passport");
const reminderController = __importStar(require("./controllers/reminders"));
const user_1 = require("./controllers/user");
//Create express app
const app = (0, express_1.default)();
//Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path_1.default.join(__dirname, "../views"));
app.use((0, compression_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../client/build"), {
    maxAge: 31557600000,
}));
app.use((0, express_session_1.default)({
    resave: true,
    saveUninitialized: true,
    secret: "SESSION_SECRET",
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Connect to MongoDB
const mongoUrl = "mongodb://localhost:27017/covid";
mongoose_1.default
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
})
    .catch((err) => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    // process.exit();
});
/**
 * Primary app routes
 */
app.get("/", homeController.index);
app.post("/auth/google", userController.googleAuth);
app.post("/logout", userController.logout);
app.get("/account/getDoses", passport_2.isAuthenticated, userController.getDoses);
app.post("/account/setDoses", passport_2.isAuthenticated, userController.setDoses);
app.get("/account/certificates/status", passport_2.isAuthenticated, userController.certificatesStatus);
app.post("/account/reminder/add", passport_2.isAuthenticated, reminderController.addReminder);
app.delete("/account/reminder/remove", passport_2.isAuthenticated, reminderController.removeReminder);
app.get("/account/reminder/list", passport_2.isAuthenticated, reminderController.listReminder);
app.post("/account/telegram/update", passport_2.isAuthenticated, userController.verifyTelegram);
app.post("/account/mobile/update", passport_2.isAuthenticated, userController.addMobile);
app.get("/account/reminder/config", passport_2.isAuthenticated, userController.getReminderConfig);
app.get("/account/certificate", passport_2.isAuthenticated, user_1.getCertificate);
//ONLY FOR TESTING PURPOSE
app.post("/triggerScanReminders", reminderController.triggerScanReminders);
// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../client/build", "index.html"));
});
exports.default = app;
