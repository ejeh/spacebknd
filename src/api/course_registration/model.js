/**
 * @author Godfrey Ejeh
 * @description Creating the user account
 * @property {String} user user's email account
 * @property {String} courseName user's courseName
 * @property {String} status user's status
 * @property {String} date user's date 0f course registration
 *  */

import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Why no user"],
    },

    courseName: {
      type: String,
      default: "",
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "pending"],
      default: "pending",
    },
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

CourseSchema.index({ createdAt: 1 });

const Course = mongoose.model("Course", CourseSchema);

export const { ObjectId } = mongoose.Types;
export default Course;
