import { Router } from "express";
import { withdrawMoney } from "../../controllers/provider/walletController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.route('/:id/:walletID/withdraw').post(authMiddleware, withdrawMoney)

export {router as providerWalletRouter}
