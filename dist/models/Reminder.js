"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reminder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reminderSchema = new mongoose_1.default.Schema({
    email: String,
    type: Number,
    date: String,
    message: String,
    center: Number,
    centername: String,
});
exports.Reminder = mongoose_1.default.model("Reminder", reminderSchema);
