import { Router } from "express";
const router = Router();

import {
  getWalletCustomer,
  createWalletCustomer,
} from "../../controllers/customer/walletController.js";

router.route("/:customerID").get(getWalletCustomer).post(createWalletCustomer);

export default router;
