import express from "express";
import * as course from "./controller";
import { isValidUser, isValidAdmin } from "../auth/controller";

const router = express.Router();

/**
 * @api {post} /course create course
 */

router.post("/course/reg", course.upload.single("image"), course.create);

/**
 * @api {get} /user Retrieve courses
 */
router.get("/courses/admin", isValidAdmin, course.findAll);

export default router;
