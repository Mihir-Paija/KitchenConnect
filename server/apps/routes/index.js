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

//subscriptionsListRouter -> customer (GET)
import subscriptionsRouter from "./customer/subscribeRouter.js";
router.use("/customer/subscription", subscriptionsRouter);

//subscriptionOrdersRouter -> customer (GET)
import subscriptionOrdersRouter from "./customer/getSubscriptionOrderRouter.js";
router.use("/customer/subscriptionOrders", subscriptionOrdersRouter);

//skipSubscriptionOrdersRouter -> customer (POST)
import skipSubscriptionOrdersRouter from "./customer/skipSubOrderRouter.js";
router.use("/customer/subscriptionOrders/skip", skipSubscriptionOrdersRouter);

//cancelSubscripitonRouter -> customer (POST)
// import cancelSubscripitonRouter from "./customer/skipSubOrderRouter.js";
// router.use("/customer/subscriptionOrders", cancelSubscripitonRouter);

//OrderRouter -> customer (POST)
import OrderRouter from "./customer/orderRouter.js";
router.use("/customer/order", OrderRouter);

//OrderRouter -> customer (GET)
import OrderListRouter from "./customer/orderRouter.js";
router.use("/customer/order", OrderListRouter);

//OrderDetailsRouter -> customer (GET)
import OrderDetailsRouter from "./customer/getOrderDetails.js";
router.use("/customer/orderDetails", OrderDetailsRouter);

//profileRouter -> customer (PATCH)
import profileCustomerRouter from "./customer/profileRoute.js";
router.use("/customer/profile", profileCustomerRouter);

//walletRouter -> customer (GET)(POST)
import walletCustomerRouter from "./customer/walletRouter.js";
router.use("/customer/wallet", walletCustomerRouter);

//feedBackRouter -> customer (GET)(POST)
import feedBackRouter from "./customer/feedBackRouter.js";
router.use("/customer/feedBack", feedBackRouter);

import { providerAuthRouter } from "./provider/authRouter.js";
import { profileRouter } from "./provider/profileRouter.js";
import { tiffinRouter } from "./provider/tiffinRouter.js";
import { menuRouter } from "./provider/menuRouter.js";
import { subscriptionRouter } from "./provider/subscriptionRouter.js";
import { subscriberRouter } from "./provider/subscriberRouter.js";
import { orderRouter } from "./provider/orderRouter.js";
import { providerWalletRouter } from "./provider/walletRouter.js";
import { providerHistoryRouter } from "./provider/historyRouter.js";
router.use("/provider", providerAuthRouter);
router.use("/provider/profile", profileRouter);
router.use("/provider/tiffin", tiffinRouter);
router.use("/provider/menu", menuRouter);
router.use("/provider/subscription", subscriptionRouter);
router.use("/provider/subscriber", subscriberRouter);
router.use("/provider/order", orderRouter);
router.use('/provider/wallet', providerWalletRouter)
router.use('/provider/history', providerHistoryRouter)

import { walletRouter } from "./shared/walletRouter.js";
router.use("/wallet", walletRouter);

export default router;
