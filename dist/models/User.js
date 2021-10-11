"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true },
    name: String,
    picture: String,
    d1: { type: Boolean, default: false },
    d2: { type: Boolean, default: false },
    d1Date: String,
    d2Date: String,
    telegram: String,
    mobile: String,
});
exports.User = mongoose_1.default.model("User", userSchema);
