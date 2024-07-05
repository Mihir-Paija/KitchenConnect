import { Router } from "express";
const router = Router();
import {
  subscriptionDetailsGet,
  cancelSubscription,
} from "../../controllers/customer/subscriptionContoller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

router.route("/:subscriptionID").get(subscriptionDetailsGet);
router.route("cancel/:subscriptionID").patch(cancelSubscription);

export default router;
