import { Router } from "express";
import { decideStatus, getSubscribers } from "../../controllers/provider/subscriberController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.route('/:id').get(authMiddleware, getSubscribers)
router.route('/:id/:subscriptionID').post(authMiddleware, decideStatus)

export {router as subscriberRouter}