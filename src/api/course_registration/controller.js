import Course from "./model";
import { success, fail, notFound } from "../../services/helpers/responses";
import { uploads, deleteImage } from "../../services/cloudnary";
import fs from "fs";
import path from "path";
import shortId from "shortid";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../../upload"));
  },
  filename: (req, file, cb) => {
    cb(null, shortId.generate() + "-" + file.originalname);
  },
});

export const upload = multer({
  storage: storage,
});

// Course registration
export const create = async (req, res) => {
  const data = req.body || {};
  const file = req.file || {};

  // validate request
  if (!data.fullName) {
    return fail(
      res,
      422,
      "Full name can not be empty and must be alphanumeric."
    );
  }
  if (!data.email) {
    return fail(res, 422, "Email can not be empty and must be alphanumeric.");
  }
  if (!data.gender) {
    return fail(res, 422, "Gender can not be empty and must be alphanumeric.");
  }
  if (!data.employmentStatus) {
    return fail(
      res,
      422,
      "EmploymentStatus can not be empty and must be alphanumeric."
    );
  }

  if (!data.address) {
    return fail(res, 422, "Address can not be empty and must be alphanumeric.");
  }
  if (!data.amount) {
    return fail(res, 422, "Amount can not be empty and must be alphanumeric.");
  }
  if (!data.levelOfEducation) {
    return fail(
      res,
      422,
      "Level of education can not be empty and must be alphanumeric."
    );
  }
  if (!data.ageGroup) {
    return fail(
      res,
      422,
      "Age group can not be empty and must be alphanumeric."
    );
  }
  if (!data.courseName) {
    return fail(
      res,
      422,
      "Course name can not be empty and must be alphanumeric."
    );
  }
  if (!data.phone) {
    return fail(
      res,
      422,
      "Phone number can not be empty and must be alphanumeric."
    );
  }
  if (!file.path) {
    return fail(
      res,
      422,
      "Bank payment receipt can not be empty and must be alphanumeric."
    );
  }

  let new_path;

  try {
    const cloudUpload = async (path) => uploads(path, "courseReg");

    const { path } = file;
    new_path = await cloudUpload(path);

    await fs.unlinkSync(path);
  } catch (error) {
    return fail(res, 422, error.message);
  }
  const newObject = {};
  newObject.date = Date.now();
  if (file.path) newObject.image = new_path.url;
  if (data.fullName) newObject.fullName = data.fullName;
  if (data.email) newObject.email = data.email;
  if (data.gender) newObject.gender = data.gender;
  if (data.employmentStatus) newObject.employmentStatus = data.employmentStatus;
  if (data.address) newObject.address = data.address;
  if (data.amount) newObject.amount = data.amount;
  if (data.levelOfEducation) newObject.levelOfEducation = data.levelOfEducation;
  if (data.ageGroup) newObject.ageGroup = data.ageGroup;
  if (data.courseName) newObject.courseName = data.courseName;
  if (data.phone) newObject.phone = data.phone;

  // create a course
  const course = new Course(newObject);

  // Save course to database
  return course
    .save()
    .then((result) => {
      if (!result) {
        return notFound(res, 404, "Error not found newly added course");
      }
      return success(
        res,
        200,
        result,
        "New course record has been created successfully"
      );
    })
    .catch((err) => {
      fail(res, 500, `Error occured while creating the course. ${err.message}`);
    });
};

// / Retrieve and return all records from the database.
export function findAll(req, res) {
  return Course.find()
    .limit(500)
    .sort({ createdAt: -1 })
    .populate({
      path: "user",
      select: "id fullname phone address email completeProfile",
    })
    .select({
      // eslint-disable-next-line object-property-newline
      courseName: true,
      status: true,
      date: true,
    })
    .then((result) => {
      return success(
        res,
        200,
        result,
        "retrieving record(s) was successfully!"
      );
    })
    .catch((err) =>
      fail(res, 500, `Error retrieving record(s).\r\n${err.message}`)
    );
}
