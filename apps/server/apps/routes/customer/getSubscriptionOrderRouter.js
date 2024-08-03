import { Router } from "express";
const router = Router();
import { subscriptionOrderGet } from "../../controllers/customer/subscriptionContoller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

router.route("/:subscriptionID").get(subscriptionOrderGet);

export default router;
