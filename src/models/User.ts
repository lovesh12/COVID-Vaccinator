import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    _id?: string;
    email: string;
    name: string;
    picture: string;
    d1: boolean;
    d2: boolean;
    d1Date: string;
    d2Date: string;
    telegram?: string;
    mobile?: string;
};

const userSchema = new mongoose.Schema<UserDocument>({
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

export const User = mongoose.model<UserDocument>("User", userSchema);
