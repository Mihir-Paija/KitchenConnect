import { Router } from "express";
import { getSubscriptions, addSubscription, editSubscription, deleteSubscription, sendNotification } from "../../controllers/provider/subscriptionController.js";
import { authMiddleware, tiffinMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

router.route('/:id/:tiffinID').get(authMiddleware, tiffinMiddleware, getSubscriptions).post(authMiddleware, tiffinMiddleware, addSubscription)
                              .patch(authMiddleware, tiffinMiddleware, editSubscription)
router.route('/:id/:tiffinID/delete').patch(authMiddleware, tiffinMiddleware, deleteSubscription)
router.route('/sendNotification').post(sendNotification)
export {router as subscriptionRouter}