import Course from "./model";
const fs = require("fs");

import { success, fail, notFound } from "../../services/helpers/responses";

// Course registration
export const create = async (req, res) => {
  const img = fs.readFileSync(req.file.path);
  const encode_img = img.toString("base64");

  // const finalImg = {
  //   filename: req.file.filename,
  //   contentType: req.file.mimetype,
  //   imageBase64: encode_img,
  // };

  const data = req.body || {};

  // validate request
  if (!data.surname) {
    return fail(res, 422, "Surname can not be empty and must be alphanumeric.");
  }
  if (!data.firstName) {
    return fail(
      res,
      422,
      "first name can not be empty and must be alphanumeric."
    );
  }

  if (!data.email) {
    return fail(res, 422, "Email can not be empty and must be alphanumeric.");
  }
  if (!data.gender) {
    return fail(res, 422, "Gender can not be empty and must be alphanumeric.");
  }
  if (!data.stateOrigin) {
    return fail(
      res,
      422,
      "state of origin can not be empty and must be alphanumeric."
    );
  }

  if (!data.employmentStatus) {
    return fail(
      res,
      422,
      "EmploymentStatus can not be empty and must be alphanumeric."
    );
  }

  if (!data.tranningHours) {
    return fail(
      res,
      422,
      "Trainning Hours can not be empty and must be alphanumeric."
    );
  }

  if (!data.address) {
    return fail(res, 422, "Address can not be empty and must be alphanumeric.");
  }

  if (!data.qualification) {
    return fail(
      res,
      422,
      "Level of education can not be empty and must be alphanumeric."
    );
  }
  if (!data.NIN) {
    return fail(res, 422, "NIN can not be empty and must be alphanumeric.");
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
  if (!data.dob) {
    return fail(
      res,
      422,
      "Date of birth can not be empty and must be alphanumeric."
    );
  }

  if (!data.maritalStatus) {
    return fail(
      res,
      422,
      "Marital Status can not be empty and must be alphanumeric."
    );
  }
  if (!data.disability) {
    return fail(
      res,
      422,
      "disability can not be empty and must be alphanumeric."
    );
  }

  // if (!img) {
  //   return fail(res, 422, "Image cannot be empty");
  // }

  const newObject = {};
  newObject.date = Date.now();
  newObject.filename = req.file.filename;
  newObject.contentType = req.file.mimetype;
  newObject.imageBase64 = encode_img;
  if (data.firstName) newObject.firstName = data.firstName;
  if (data.surname) newObject.surname = data.surname;
  if (data.otherNames) newObject.otherNames = data.otherNames;
  if (data.email) newObject.email = data.email;
  if (data.gender) newObject.gender = data.gender;
  if (data.employmentStatus) newObject.employmentStatus = data.employmentStatus;
  if (data.address) newObject.address = data.address;
  if (data.answer) newObject.answer = data.answer;
  if (data.qualification) newObject.qualification = data.qualification;
  if (data.NIN) newObject.NIN = data.NIN;
  if (data.courseName) newObject.courseName = data.courseName;
  if (data.phone) newObject.phone = data.phone;
  if (data.dob) newObject.dob = data.dob;
  if (data.disability) newObject.disability = data.disability;
  if (data.maritalStatus) newObject.maritalStatus = data.maritalStatus;
  if (data.stateOrigin) newObject.stateOrigin = data.stateOrigin;
  if (data.tranningHours) newObject.tranningHours = data.tranningHours;

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
    .limit(400)
    .sort({ createdAt: -1 })
    .select({
      // eslint-disable-next-line object-property-newline
      courseName: true,
      surname: true,
      firstName: true,
      otherNames: true,
      qualification: true,
      gender: true,
      phone: true,
      maritalStatus: true,
      address: true,
      dob: true,
      NIN: true,
      disability: true,
      stateOrigin: true,
      email: true,
      answer: true,
      employmentStatus: true,
      tranningHours: true,
      filename: true,
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

export function findOne(req, res) {
  Course.findOne({ filename: req.params.filename }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.contentType(result.contentType);
      res.send(Buffer.from(result.imageBase64, "base64"));
    }
  });
}
