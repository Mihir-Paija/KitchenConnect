import Router from 'express'
import { getWallet, createWallet } from '../../controllers/shared/walletController';

const router = Router();

router.use('/:id/get').get(getWallet)
router.use('/:id/create').post(createWallet)
