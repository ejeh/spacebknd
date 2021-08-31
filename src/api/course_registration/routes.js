import express from "express";
import * as course from "./controller";
import { isValidUser, isValidAdmin } from "../auth/controller";

const router = express.Router();

/**
 * @api {post} /course create course
 * @apiName CreateCourse
 * @apiGroup course
 * @apiParam {String} courseName course courseName
 * @apiParam {String} date course date
 * @apiParam {String} status course status
 * @apiSuccess {Object} agent agent's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 agent not found.
 */

router.post("/course", isValidUser, course.create);

/**
 * @api {get} /user Retrieve courses
 * @apiName Retrievecourses
 * @apiGroup courses
 * @apiSuccess {Object[]} rows List of courses
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/courses/admin", isValidAdmin, course.findAll);

export default router;
