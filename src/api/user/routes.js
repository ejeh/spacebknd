import express from "express";
import * as user from "./contoller";
import { isValidUser, isValidAdmin } from "../auth/controller";

const router = express.Router();

/**
 * @api {put} /user Update user
 * @apiName Updateuser
 * @apiGroup user
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam {String} fullname user's fullname
 * @apiParam {String} email  user's email address
 * @apiSuccess {Object} user user's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 user not found.
 */
router.put("/user", isValidUser, user.update);

/**
 * @api {get} /user/:userId Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiSuccess {Object} user user's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 user not found.
 */
router.get("/user/:userId", isValidUser, user.findOne);

/**
 * @api {get} /user Retrieve user
 * @apiName Retrieveuser
 * @apiGroup user
 * @apiSuccess {Object[]} rows List of user
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/users/admin", isValidAdmin, user.findAll);

/**
 * @api {delete} /user/:userId Delete user
 * @apiName Deleteuser
 * @apiGroup user
 * @apiPermission master
 * @apiParam  access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 user not found.
 * @apiError 401 master access only.
 */
router.delete("/user/:userId", isValidAdmin, user.destroy);

export default router;
