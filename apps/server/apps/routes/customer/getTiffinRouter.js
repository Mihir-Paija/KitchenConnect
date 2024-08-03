import { Router } from "express";
const router = Router();

import { tiffinGet } from "../../controllers/customer/tiffinController.js";
router.route("/:kitchenId").get(tiffinGet);

export default router;
