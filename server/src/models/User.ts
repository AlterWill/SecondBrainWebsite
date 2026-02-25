import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  passwordHash: string;
  refreshToken: string[];
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, index: true, unique: true, required: true },
    passwordHash: { type: String, required: true },
    refreshToken: [{ type: String }],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
