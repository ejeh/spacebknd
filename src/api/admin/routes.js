import express from "express";
import * as admin from "./controller";
import { isValidAdmin } from "../auth/controller";

const router = express.Router();

/**
 * @api {get} /admins/:adminId Retrieve admin
 * @apiName RetrieveAdmin
 * @apiGroup Admin
 * @apiSuccess {Object} admin Admin's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Admin not found.
 */
router.get("/admin/:adminId", isValidAdmin, admin.findOne);

/**
 * @api {get} /admins Retrieve admins
 * @apiName RetrieveAdmins
 * @apiGroup Admin
 * @apiSuccess {Object[]} rows List of Admins.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/admin", isValidAdmin, admin.findAll);

/**
 * @api {put} /admins Update admin
 * @apiName UpdateAdmin
 * @apiGroup Admin
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam {String} firstName admin's first name
 * @apiParam {String} lastName admin's last name
 * @apiParam {String} email  admin's email address
 * @apiParam {String} password  admin's password
 * @apiParam {Date} updated update date
 * @apiSuccess {Object} admin Admin's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Admin not found.
 * @apiError 401 master access only.
 */

router.put("/admin", isValidAdmin, admin.update);

/**
 * @api {delete} /admins/:adminId Delete admin
 * @apiName DeleteAdmin
 * @apiGroup Admin
 * @apiPermission master
 * @apiParam  access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Admin not found.
 * @apiError 401 master access only.
 */
router.delete("/admin/:adminId", isValidAdmin, admin.destroy);

export default router;
