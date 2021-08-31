/**
 * @author Godfrey Ejeh
 * @description Creating the user payment account
 * @property {String} email user's email account
 * @property {String} full_name user's fullname
 * @property {String} amount user's amount
 * @property {String} reference user's reference
 *
 *  */

import mongoose, { Schema } from "mongoose";

const userPaymentSchema = new Schema(
  {
    full_name: { type: String, default: "" },
    email: {
      type: String,
      lowercase: true,
      max: 100,
      trim: true,
      required: true,
    },
    amount: { type: Number, required: true },
    reference: { type: String, required: true },
    dateOfPayment: { type: Date, default: Date.now },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Why no user"],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Why no course"],
    },
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

userPaymentSchema.index({ createdAt: 1 });

const UserPayment = mongoose.model("UserPayment", userPaymentSchema);

export const { ObjectId } = mongoose.Types;
export default UserPayment;
