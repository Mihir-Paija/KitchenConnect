import { Router } from "express";
const router = Router();
import {
  subscribe,
  subscriptionsGet,
} from "../../controllers/customer/subscriptionContoller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

router
  .route("/:customerID/:kitchenID/:tiffinID/:subscriptionID")
  .post(subscribe);

router.route("/:customerID").get(subscriptionsGet);

export default router;
