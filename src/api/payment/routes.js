import express from "express";
import * as payment from "./controller";
import { isValidUser, isValidAdmin } from "../auth/controller";

const router = express.Router();

/**
 * @api {post} /paystack create payment
 * @apiName CreatePayment
 * @apiGroup payment
 * @apiParam {String} full_name payment full_name
 * @apiParam {String} amount payment amount
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 agent not found.
 */

router.post("/paystack/pay", isValidUser, payment.create);
router.get("/paystack/callback", payment.find);

/**
 * @api {get} /user Retrieve courses
 * @apiName Retrievecourses
 * @apiGroup courses
 * @apiSuccess {Object[]} rows List of courses
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/payment/admin", isValidAdmin, payment.findAll);

export default router;
