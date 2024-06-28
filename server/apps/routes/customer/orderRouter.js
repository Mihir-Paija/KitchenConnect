import { Router } from "express";
const router = Router();
import { placeOrder } from "../../controllers/customer/orderController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

router.route("/:customerID/:kitchenID/:tiffinID").post(placeOrder);

// router.route("/:customerID").get(subscriptionsGet);

export default router;
