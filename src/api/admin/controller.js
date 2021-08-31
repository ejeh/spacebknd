import Admin, { ObjectId } from "./model";
import { success, fail, notFound } from "../../services/helpers/responses";
import * as helper from "../../services/helpers";

// Retrieve a single record with a given adminId
export function findOne(req, res) {
  let recordId = req.params.adminId || "";
  const { userId, userType } = res.locals;
  if (!userId || !userType)
    return fail(res, 400, "Invalid authentication credentials");
  if (userType !== "admin")
    return fail(
      res,
      422,
      `Only Admins are allowed to access this record not ${userType}`
    );
  if (!recordId) recordId = userId;
  if (!ObjectId.isValid(recordId))
    return fail(res, 422, "Invalid record Id as request parameter");
  return Admin.findById(recordId)
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
  return Admin.find()
    .limit(20)
    .sort({ createdAt: -1 })
    .select({
      // eslint-disable-next-line object-property-newline
      email: true,
      fullname: true,
      phone: true,
      address: true,
    })
    .then((result) => {
      success(res, 200, result, "retrieving record(s) was successfully!");
    })
    .catch((err) =>
      fail(res, 500, `Error retrieving record(s).\r\n${err.message}`)
    );
}

// Update a admin
export async function update(req, res) {
  const data = req.body || {};
  const { userId, userType } = res.locals;
  if (!userId || !userType)
    return fail(res, 400, "Invalid authentication credentials");
  if (userType !== "admin")
    return fail(
      res,
      422,
      `Only Admins are allowed to update this record not ${userType}`
    );
  // Validate request
  if (!data.phone)
    return fail(res, 422, "phone cannot be empty and must be alphanumeric.");
  if (!data.address)
    return fail(res, 422, "address cannot be empty and must be alphanumeric.");
  if (!data.fullname)
    return fail(res, 422, "You must provide an alphanumeric full name");

  let record = {};
  try {
    record = await Admin.findById(userId);
  } catch (err) {
    return fail(res, 422, "Error fetching Admin information");
  }
  if (!record) return notFound(res, "Admin not found");

  const newObject = {};
  newObject.updated = Date.now();
  if (data.fullname) newObject.fullname = data.fullname;
  if (data.phone) newObject.phone = data.phone;
  if (data.address) newObject.address = data.address;

  if (data.password)
    newObject.password = await helper.hashPassword(data.password);
  newObject.completeProfile = true;

  return Admin.findByIdAndUpdate(userId, newObject, { new: true })
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

// Delete a admin with the specified adminId in the request
export async function destroy(req, res) {
  const recordId = req.params.adminId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId))
    return fail(res, 422, "Invalid record Id as request parameter");

  const { userId, userType } = res.locals;
  console.log(recordId);
  console.log(userId);

  if (!userId || !userType)
    return fail(res, 400, "Invalid authentication credentials");

  if (userType === "admin") {
    // we are cool!
  } else {
    return fail(
      res,
      422,
      `Only super Admin is allowed to delete this record not ${userType}`
    );
  }
  return Admin.findByIdAndRemove(recordId)
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
