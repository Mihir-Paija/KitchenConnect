import Router from 'express'
import { getWallet, createWallet } from '../../controllers/shared/walletController.js';

const router = Router();

router.route('/:id/get').get(getWallet)
router.route('/:id/create').post(createWallet)

export {router as walletRouter}
