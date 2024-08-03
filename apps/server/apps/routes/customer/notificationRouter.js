import { Router } from "express";
const router = Router();

import { pushToken } from "../../controllers/customer/pushTokenController.js";

router.route("/:customerID").post(pushToken);

export default router;
