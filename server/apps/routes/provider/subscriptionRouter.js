import { Router } from "express";
import { getSubscriptions, addSubscription } from "../../controllers/provider/subscriptionController.js";
import { authMiddleware, tiffinMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

router.route('/:id/:tiffinID').get(authMiddleware, tiffinMiddleware, getSubscriptions).post(authMiddleware, tiffinMiddleware, addSubscription)

export {router as subscriptionRouter}