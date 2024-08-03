import { Router } from "express";
const router = Router();

import { subscriptionPlansGet } from "../../controllers/customer/subscriptionPlanController.js";
router.route("/:kitchenID/:tiffinID").get(subscriptionPlansGet);

export default router;
