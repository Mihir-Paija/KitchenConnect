import { Router } from "express";
import {providerAuthRouter} from './provider/authRouter.js'
const router = Router();

//Signup Router -> customer
import signupCustomerRouter from "./customer/signupRouter.js";
router.use("/customer/signup", signupCustomerRouter);

//Login Router -> customer
import loginCustomerRouter from "./customer/loginRouter.js";
router.use("/customer/login", loginCustomerRouter);

import { logoutCustomerRouter } from "./customer/logoutRouter.js";
router.use("/customer/logout", logoutCustomerRouter);

router.use('/provider', providerAuthRouter);

export default router;
