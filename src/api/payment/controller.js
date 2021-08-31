import Payment from "./model";
import { success, fail, notFound } from "../../services/helpers/responses";
import { findUserById } from "../user/contoller";
import { findcourseByUser } from "../course_registration/controller";
import { initializePayment, verifyPayment } from "./paystack";
import _ from "lodash";

export const create = async (req, res) => {
  const data = req.body || {};
  const { userId, userType } = res.locals;

  if (userType !== "user") {
    return fail(
      res,
      422,
      `Only Users are allowed to create payment not ${userType}`
    );
  }

  // Validate request
  if (!data.full_name) {
    return fail(
      res,
      422,
      "Full name can not be empty and must be alphanumeric."
    );
  }

  if (!data.email) {
    return fail(res, 422, "Email can not be empty and must be alphanumeric.");
  }

  if (!data.amount) {
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

  let course;
  try {
    course = await findcourseByUser(userId);
    if (!course) return fail(res, 422, "Unable to detect Finder course");
  } catch (err) {
    return fail(res, 500, "Unable to  complete request");
  }

  const newObject = {};
  newObject.metadata = {
    full_name: data.full_name,
    user: userId,
    dateOfPayment: Date.now(),
    course: course.id,
  };
  if (data.amount) newObject.amount = data.amount *= 100;
  if (data.email) newObject.email = data.email;

  initializePayment(newObject, (error, body) => {
    if (error) {
      if (error) {
        return fail(
          res,
          502,
          "network error! Please check your internet connection"
        );
      }
    }
    const response = JSON.parse(body);
    console.log(response);
    res.redirect(response.data.authorization_url);
  });
};

// Retrive data from paystack  with a given reference and save in mongodb database
export const find = (req, res) => {
  const ref = req.query.reference;

  verifyPayment(ref, (error, body) => {
    if (error) {
      return fail(
        res,
        502,
        "network error! Please check your internet connection"
      );
    }

    const response = JSON.parse(body);
    const { reference, amount } = response.data;
    const { full_name, user, date, course } = response.data.metadata;
    const { email } = response.data.customer;

    const newPayment = {
      reference,
      amount,
      email,
      full_name,
      user,
      date,
      course,
    };

    const payment = new Payment(newPayment);
    payment
      .save()
      .then((payment) => {
        console.log(payment);
        if (payment) {
          return success(
            res,
            200,
            payment,
            "retrieving record(s) was successfully!"
          );
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
};

// / Retrieve and return all records from the database.
export function findAll(req, res) {
  return Payment.find()
    .limit(500)
    .sort({ createdAt: -1 })
    .populate({
      path: "user",
      select: "id fullname phone address email completeProfile",
    })
    .populate({
      path: "course",
      select: "id courseName",
    })
    .select({
      // eslint-disable-next-line object-property-newline
      email: true,
      full_name: true,
      date: true,
      amount: true,
      course: true,
      reference: true,
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
