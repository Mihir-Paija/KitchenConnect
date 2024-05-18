import { Router } from "express";
const router = Router();

import {
  signupGet,
  signupPost,
} from "../../controllers/customer/signupController.js";

router.route("/").get(signupGet).post(signupPost);

export default router;
