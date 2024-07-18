import Router from 'express'
import { adminAuthMiddleware } from '../../middleware/adminMiddleware.js';
import { getCustomerCount, getCustomerDetails } from '../../controllers/admin/customerController.js';
const router = Router();

router.route('/:id/count').get(adminAuthMiddleware, getCustomerCount)
router.route('/:id/details').post(adminAuthMiddleware, getCustomerDetails)

export {router as adminCustomerRouter} 