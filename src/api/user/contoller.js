import User, { ObjectId } from "./model";
import { success, fail, notFound } from "../../services/helpers/responses";
import * as helper from "../../services/helpers";

/**
 * @description findUserById find a particular user by id
 * @param {String} userId user id
 * @returns {Promise} user object promise
 */
export function findUserById(userId) {
  return User.findById(userId)
    .select({
      fullname: true,
      phone: true,
      address: true,
    })

    .then((user) => {
      if (!user) return {};
      return user;
    })
    .catch((err) => {
      throw err;
    });
}

// Retrieve a single record with a given userId
export function findOne(req, res) {
  let recordId = req.params.userId || "";
  const { userId, userType } = res.locals;
  if (!userId || !userType)
    return fail(res, 400, "Invalid authentication credentials");
  if (userType !== "user")
    return fail(
      res,
      422,
      `Only Users are allowed to view this record not ${userType}`
    );
  if (!recordId) recordId = userId;
  if (!ObjectId.isValid(recordId))
    return fail(res, 422, "Invalid record Id as request parameter");
  return User.findById(recordId)
    .then((result) => {
      if (!result) return notFound(res, "Error record not found.");
      return success(res, 200, result, "retrieving record was successfully!");
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        notFound(res, `Error retrieving record.\r\n${err.message}`);
      }
      return fail(res, 500, `Error retrieving record.\r\n${err.message}`);
    });
}

// / Retrieve and return all records from the database.
export function findAll(req, res) {
  return User.find()
    .limit(500)
    .sort({ createdAt: -1 })
    .select({
      // eslint-disable-next-line object-property-newline
      email: true,
      fullname: true,
      phone: true,
      address: true,
      completeProfile: true,
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

// Update a user
export async function update(req, res) {
  const data = req.body || {};
  const { userId, userType, userEmail } = res.locals;
  if (!userId || !userType)
    return fail(res, 400, "Invalid authentication credentials");
  if (userType !== "user")
    return fail(
      res,
      422,
      `Only Users are allowed to update this record not ${userType}`
    );
  // Validate request
  if (!userEmail && !data.email)
    return fail(res, 422, "You must provide an alphanumeric email address");

  if (!data.fullname)
    return fail(res, 422, "You must provide an alphanumeric full name");

  if (!data.phone)
    return fail(res, 422, "You must provide an alphanumeric phone number");

  if (!data.address)
    return fail(res, 422, "You must provide an alphanumeric address");

  let record = {};
  try {
    record = await User.findById(userId);
  } catch (err) {
    return fail(res, 422, "Error fetching User information");
  }
  if (!record) return notFound(res, "User not found");
  const isComplete = record.completeProfile;

  const newObject = {};
  newObject.updated = Date.now();
  if (data.fullname) newObject.fullname = data.fullname;
  if (data.phone) newObject.phone = data.phone;
  if (data.address) newObject.address = data.address;

  if (!isComplete && data.email !== "") {
    if (!userEmail) newObject.email = data.email.toLowerCase();
  }
  if (data.password)
    newObject.password = await helper.hashPassword(data.password);
  newObject.completeProfile = true;

  return User.findByIdAndUpdate(userId, newObject, { new: true })
    .then((result) => {
      if (!result)
        return notFound(
          res,
          `Error: newly submitted record not found with id ${userId}`
        );
      return success(res, 200, result, "Record has been created successfully!");
    })
    .catch((err) =>
      fail(
        res,
        500,
        `Error updating record with id ${userId}.\r\n${err.message}`
      )
    );
}

// Delete an admin with the specified adminId in the request
export async function destroy(req, res) {
  const recordId = req.params.userId || "";
  const { userId, userType } = res.locals;
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId))
    return fail(res, 422, "Invalid record Id as request parameter");

  if (!userId || !userType) {
    return fail(res, 400, "Invalid authentication credentials");
  }

  return User.findByIdAndRemove(recordId)
    .then((record) => {
      if (!record) return notFound(res, `Record not found with id ${recordId}`);
      return success(res, 200, [], "Record deleted successfully!");
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return notFound(
          res,
          `Error: record not found with id ${recordId}\r\n${err.message}`
        );
      }
      return fail(
        res,
        500,
        `Error: could not delete record with id ${recordId}\r\n${err.message}`
      );
    });
}
