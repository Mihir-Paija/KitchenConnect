import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { decideOrderStatus, getOrders, getPendingOrders, optOut } from "../../controllers/provider/orderController.js";

const router = Router();

router.route('/:id').get(authMiddleware, getOrders)
router.route('/:id/pending').get(authMiddleware, getPendingOrders)
router.route('/:id/out').post(authMiddleware, optOut)
router.route('/:id/:orderID').post(authMiddleware, decideOrderStatus)


export {router as orderRouter}