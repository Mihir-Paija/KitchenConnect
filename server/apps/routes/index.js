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

//getSubscriptionRouter -> customer
import getSubscriptionPlanRouter from "./customer/getSubscriptionPlanRouter.js";
router.use("/customer/subscriptionPlans", getSubscriptionPlanRouter);

//subscribeRouter -> customer (POST)
import subscribeRouter from "./customer/subscribeRouter.js";
router.use("/customer/subscription", subscribeRouter);

//subscriptionDetailsRouter -> customer (GET)
import subscriptionDetailsRouter from "./customer/getSubscriptionDetails.js";
router.use("/customer/subscriptionDetail", subscriptionDetailsRouter);

//subscriptionDetailsRouter -> customer (GET)
import subscriptionsRouter from "./customer/subscribeRouter.js";
router.use("/customer/subscription", subscriptionsRouter);

import { providerAuthRouter } from "./provider/authRouter.js";
import { profileRouter } from "./provider/profileRouter.js";
import { tiffinRouter } from "./provider/tiffinRouter.js";
import { menuRouter } from "./provider/menuRouter.js";
import { subscriptionRouter } from "./provider/subscriptionRouter.js";
import { subscriberRouter } from "./provider/subscriberRouter.js";
import { orderRouter } from "./provider/orderRouter.js";
router.use("/provider", providerAuthRouter);
router.use("/provider/profile", profileRouter);
router.use("/provider/tiffin", tiffinRouter);
router.use("/provider/menu", menuRouter);
router.use("/provider/subscription", subscriptionRouter);
router.use("/provider/subscriber", subscriberRouter);
router.use("/provider/order", orderRouter);

export default router;
