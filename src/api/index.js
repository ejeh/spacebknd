import express from "express";

import authRoute from "./auth";
import userRoute from "./user";
import adminRoute from "./admin";
import courseRoute from "./course_registration";
import paymentRoute from "./payment";
import ideasCourseRoute from "./ideasCourseReg";

const router = express.Router();

// Use Routes
router.use(authRoute);
router.use(userRoute);
router.use(adminRoute);
router.use(courseRoute);
router.use(paymentRoute);
router.use(ideasCourseRoute);

export default router;
