import Course from "./model";
import { success, fail, notFound } from "../../services/helpers/responses";
import { findUserById } from "../user/contoller";

export const findcourseByUser = (userId) => {
  return Course.findOne({ user: userId }).then((result) => {
    return result;
  });
};

// Course registration
export const create = async (req, res) => {
  const data = req.body || {};
  const { userId, userType } = res.locals;
  if (userType !== "user") {
    return fail(
      res,
      422,
      `Only Users are allowed to create a course not ${userType}`
    );
  }
  // validate request
  if (!data.courseName) {
    return fail(
      res,
      422,
      "Course name can not be empty and must be alphanumeric."
    );
  }

  let user;
  try {
    user = await findUserById(userId);
  } catch (error) {
    return fail(res, 422, "Unable to find User Information");
  }
  if (!user) return fail(res, 422, "Unable to find User information");

  const newObject = {};
  newObject.user = userId;
  newObject.date = Date.now();
  if (data.courseName) newObject.courseName = data.courseName;

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
