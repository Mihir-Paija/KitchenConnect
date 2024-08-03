import { Router } from "express";
import { getTransactions, withdrawMoney } from "../../controllers/provider/walletController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.route('/:id/:walletID/withdraw').post(authMiddleware, withdrawMoney)
router.route('/:id/:walletID/transactions').get(authMiddleware, getTransactions)

export {router as providerWalletRouter}
