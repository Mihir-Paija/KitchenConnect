import { Router } from "express";
const router = Router();
import {
  placeOrder,
  orderListGet,
} from "../../controllers/customer/orderController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

router.route("/:customerID/:kitchenID/:tiffinID").post(placeOrder);

router.route("/:customerID").get(orderListGet);

export default router;
