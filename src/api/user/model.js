/**
 * @author Godfrey Ejeh
 * @description Creating the user account
 * @property {String} email user's email account
 * @property {String} password user's password
 * @property {String} fullname user's fullname
 * @property {String} phone user's phone
 * @property {String} address user's address
 * @property {String} completeProfile user's completeProfile
 *
 *  */
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      max: 100,
      trim: true,
      required: true,
    },
    password: { type: String, required: true },
    fullname: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      },
    },
  }
);

UserSchema.index({ createdAt: 1 });

const User = mongoose.model("User", UserSchema);

export const { ObjectId } = mongoose.Types;
export default User;
