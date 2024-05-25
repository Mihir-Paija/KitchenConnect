import { Router } from "express";
const router = Router();

//Signup Router -> customer
import signupCustomerRouter from "./customer/signupRouter.js";
router.use("/customer/signup", signupCustomerRouter);

//Login Router -> customer
import loginCustomerRouter from "./customer/loginRouter.js";
router.use("/customer/login", loginCustomerRouter);

//Logout Router -> customer
import { logoutCustomerRouter } from "./customer/logoutRouter.js";
router.use("/customer/logout", logoutCustomerRouter);

//getKitchen Router -> customer
import getKitchenRouter from "./customer/getKitchenRouter.js";
router.use("/customer/kitchen", getKitchenRouter);

import { providerAuthRouter } from "./provider/authRouter.js";
import { tiffinRouter } from "./provider/tiffinRouter.js";
router.use("/provider", providerAuthRouter);
router.use('/provider/tiffin', tiffinRouter)

export default router;
