import Router from 'express'
import { adminAuthMiddleware } from '../../middleware/adminMiddleware.js';
import { getKitchenCount, getKitchenDetails } from '../../controllers/admin/kitchenController.js';
const router = Router();

router.route('/:id/count').get(adminAuthMiddleware, getKitchenCount)
router.route('/:id/details').post(adminAuthMiddleware, getKitchenDetails)

export {router as adminKitchenRouter} 