import mongoose, { Schema } from "mongoose";

const IdeasCourseSchema = new Schema(
  {
    contentType: {
      type: String,
    },
    imageBase64: {
      type: String,
    },
    filename: {
      type: String,
    },

    imageURL: {
      type: String,
      // required: [true, "Why no image"],
    },
    surname: {
      type: String,
      required: [true, "Why no surname"],
    },

    otherNames: {
      type: String,
    },

    firstName: {
      type: String,
      required: [true, "Why no first name"],
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
    NIN: {
      type: String,
      required: [true, "Why no NIN"],
    },
    qualification: {
      type: String,
      required: [true, "Why no qualification"],
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
    answer: {
      type: String,
    },

    maritalStatus: {
      type: String,
      required: [true, "Why no maritalStatus"],
    },

    disability: {
      type: String,
      required: [true, "Why no disability"],
    },

    stateOrigin: {
      type: String,
      required: [true, "Why no stateOrigin"],
    },

    tranningHours: {
      type: String,
      required: [true, "Why no trainningHours"],
    },

    dob: {
      type: String,
      required: [true, "Why no trainningHours"],
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

IdeasCourseSchema.index({ createdAt: 1 });

const ideasCourse = mongoose.model("ideasCourse", IdeasCourseSchema);

export const { ObjectId } = mongoose.Types;
export default ideasCourse;
