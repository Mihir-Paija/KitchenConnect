import { Router } from "express";
const router = Router();

import {
    logoutGet
} from "../../controllers/customer/loginController.js";

router.route('/').get(logoutGet)

export {router as logoutCustomerRouter}