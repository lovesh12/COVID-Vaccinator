import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    _id?: string,
    email: string,
    name: string,
    picture: string,
    d1: boolean,
    d2: boolean,
    d1Date: string
    d2Date: string,
};

const userSchema = new mongoose.Schema<UserDocument>(
    {
        email: { type: String, unique: true },
        name: String,
        picture: String,
        d1: Boolean,
        d2: Boolean,
        d1Date: String,
        d2Date: String,
    },
);

export const User = mongoose.model<UserDocument>("User", userSchema);