import { Router } from "express";
const router = Router();
import { subscribe } from "../../controllers/customer/subscriptionContoller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

router.route('/:id/:kitchenID/:tiffinID/:subscriptionID').post(subscribe)

export default router