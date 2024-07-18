import Router from 'express'
import { adminAuthMiddleware } from '../../middleware/adminMiddleware.js';
import { getSubOrders, getSubscriptionDetails } from '../../controllers/admin/subscriptionController.js';
const router = Router();

router.route('/:id/details').post(adminAuthMiddleware, getSubscriptionDetails)
router.route('/:id/suborders').post(adminAuthMiddleware, getSubOrders)

export {router as adminSubscriptionRouter} 