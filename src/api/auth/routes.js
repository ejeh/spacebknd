/**
 * @author Godfrey
 */

import express from "express";
import * as user from "../auth/controller";

const router = express.Router();

router.post("/authenticate/email/:userType/signup", user.emailSignup);
router.post("/authenticate/email/:userType/login", user.emailLogin);

export default router;
