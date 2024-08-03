import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { completeOrder, decideOrderStatus, getOrders, getPendingOrders, optOut, sendOTP } from "../../controllers/provider/orderController.js";

const router = Router();

router.route('/:id').get(authMiddleware, getOrders)
router.route('/:id/complete').post(authMiddleware, completeOrder)
router.route('/:id/pending').get(authMiddleware, getPendingOrders)
router.route('/:id/out').post(authMiddleware, optOut)
router.route('/:id/otp').post(authMiddleware, sendOTP)
router.route('/:id/:orderID').post(authMiddleware, decideOrderStatus)


export {router as orderRouter}