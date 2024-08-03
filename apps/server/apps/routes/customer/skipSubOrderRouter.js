import { Router } from "express";
const router = Router();
import { skipSubOrder } from "../../controllers/customer/subscriptionContoller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

router.route("/:subscriptionID").post(skipSubOrder);

export default router;
