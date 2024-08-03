import { Router } from "express";
const router = Router();

import {
  getWalletCustomer,
  createWalletCustomer,
  addMoneyCustomer,
  withdrawMoneyCustomer,
  transactionHistoryGet,
} from "../../controllers/customer/walletController.js";

router.route("/:customerID").get(getWalletCustomer).post(createWalletCustomer);
router.route("/add/:walletID").post(addMoneyCustomer);
router.route("/withdraw/:walletID").post(withdrawMoneyCustomer);
router.route("/transactionHistory/:walletID").get(transactionHistoryGet);
export default router;
