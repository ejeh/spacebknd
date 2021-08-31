/**
 * @author Godfrey Ejeh
 * @description Creating the admin account
 * @property {String} email admin's email account
 * @property {String} password admin's password
 * @property {String} fullname admin's fullname
 * @property {String} phone admin's phone
 * @property {String} address admin's address
 * @property {String} completeProfile admin's completeProfile
 *
 *  */

import mongoose, { Schema } from "mongoose";

const AdminSchema = new Schema(
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
    completeProfile: { type: Boolean, default: false },
    updated: { type: Date, default: Date.now },
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

const Admin = mongoose.model("Admin", AdminSchema);

export const { ObjectId } = mongoose.Types;
export default Admin;
