import Router from 'express'
import { adminAuthMiddleware } from '../../middleware/adminMiddleware.js';
import { getCustomerCount, getCustomerDetails } from '../../controllers/admin/customerController.js';
const router = Router();

router.route('/count').get(adminAuthMiddleware, getCustomerCount)
router.route('/details').get(adminAuthMiddleware, getCustomerDetails)

export {router as adminCustomerRouter} 