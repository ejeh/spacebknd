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
    image: {
      type: String,
      required: [true, "Why no image"],
    },

    fullName: {
      type: String,
      required: [true, "Why no full name"],
    },

    email: {
      type: String,
      required: [true, "Why no email"],
    },
    phone: {
      type: String,
      required: [true, "Why no phone"],
    },
    gender: {
      type: String,
      required: [true, "Why no gender"],
    },
    ageGroup: {
      type: String,
      required: [true, "Why no age"],
    },
    levelOfEducation: {
      type: String,
      required: [true, "Why no age"],
    },
    employmentStatus: {
      type: String,
      required: [true, "Why no employment status"],
    },

    courseName: {
      type: String,
      required: [true, "Why no course name"],
    },
    address: {
      type: String,
      required: [true, "Why no address"],
    },
    amount: {
      type: String,
      required: [true, "Why no amount"],
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
