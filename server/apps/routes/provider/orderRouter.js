import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { getOrders } from "../../controllers/provider/orderController.js";

const router = Router();

router.route('/:id').get(authMiddleware, getOrders)

export {router as orderRouter}