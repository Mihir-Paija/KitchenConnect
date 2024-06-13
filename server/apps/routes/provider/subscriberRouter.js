import { Router } from "express";
import { getSubscribers } from "../../controllers/provider/subscriberController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.route('/:id').get(authMiddleware, getSubscribers)

export {router as subscriberRouter}