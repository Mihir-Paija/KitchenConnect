import { Router } from "express";
const router = Router();

import {
  loginGet,
  loginPost,
} from "../../controllers/customer/loginController.js";
router.route("/").get(loginGet).post(loginPost);


export default router;
