import { Router } from "express";
const router = Router();
import { orderDetailsGet } from "../../controllers/customer/orderController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

router.route("/:orderID").get(orderDetailsGet);

export default router;
