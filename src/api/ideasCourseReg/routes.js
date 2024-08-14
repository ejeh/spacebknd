import express from "express";
import * as course from "./controller";
import { isValidUser, isValidAdmin } from "../auth/controller";
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

/**
 * @api {post} /course create course
 */

router.post("/ideas/course/reg", upload.single("imageURL"), course.create);

/**
 * @api {get} /user Retrieve courses
 */
router.get("/ideas/users/admin", course.findAll);

router.get("/image/:filename", course.findOne);

export default router;
