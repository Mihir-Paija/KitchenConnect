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

//getTiffin Router -> customer
import getTiffinRouter from "./customer/getTiffinRouter.js";
router.use("/customer/tiffin", getTiffinRouter);

//getMenuRouter -> customer
import getMenuRouter from "./customer/getMenuRouter.js";
router.use("/customer/menu", getMenuRouter);

import { providerAuthRouter } from "./provider/authRouter.js";
import { tiffinRouter } from "./provider/tiffinRouter.js";
import { menuRouter } from "./provider/menuRouter.js";
import { subscriptionRouter } from "./provider/subscriptionRouter.js";
router.use("/provider", providerAuthRouter);
router.use("/provider/tiffin", tiffinRouter);
router.use("/provider/menu", menuRouter);
router.use('/provider/subscription', subscriptionRouter)

export default router;
