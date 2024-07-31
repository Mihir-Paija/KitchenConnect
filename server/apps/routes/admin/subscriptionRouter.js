import Router from 'express'
import { adminAuthMiddleware } from '../../middleware/adminMiddleware.js';
import { getSubOrders, getSubscriptionDetails } from '../../controllers/admin/subscriptionController.js';
const router = Router();

router.route('/details').post(getSubscriptionDetails)
router.route('/suborders').post(getSubOrders)

export {router as adminSubscriptionRouter} 