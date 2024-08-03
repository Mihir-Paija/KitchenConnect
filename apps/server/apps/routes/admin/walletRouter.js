import Router from 'express'
import { fetchAdminTransactions } from '../../controllers/admin/walletController.js';
import { adminAuthMiddleware } from '../../middleware/adminMiddleware.js';
const router = Router();

router.route('/transactions').get(fetchAdminTransactions)

export {router as adminWalletRouter} 