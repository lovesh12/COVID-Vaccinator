"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const sendReminder_1 = require("./util/sendReminder");
const server = app_1.default.listen(app_1.default.get("port"), () => {
    console.log("App is running at http://localhost:%d in %s mode", app_1.default.get("port"), app_1.default.get("env"));
    (0, sendReminder_1.intervalCheckNSendReminders)();
});
exports.default = server;
