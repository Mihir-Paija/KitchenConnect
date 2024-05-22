import { Router } from "express";
const router = Router();

import { kitchenGet } from "../../controllers/customer/kitchenController.js";
router.route("/").get(kitchenGet);

export default router;
