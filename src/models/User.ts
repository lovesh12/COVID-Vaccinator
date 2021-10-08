import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    email: string,
    name: string,
    picture: string,
    d1: boolean,
    d2: boolean,
    d1Date: Date
    d2Date: Date,
};

const userSchema = new mongoose.Schema<UserDocument>(
    {
        email: { type: String, unique: true },
        name: String,
        picture: String,
        d1: Boolean,
        d2: Boolean,
        d1Date: Date,
        d2Date: Date,
    },
);

export const User = mongoose.model<UserDocument>("User", userSchema);