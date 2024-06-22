import { Router } from "express";
const router = Router();
import { subscriptionDetailsGet } from "../../controllers/customer/subscriptionContoller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

router.route("/:subscriptionID").get(subscriptionDetailsGet);

export default router;
