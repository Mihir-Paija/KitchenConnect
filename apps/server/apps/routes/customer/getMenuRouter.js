import { Router } from "express";
const router = Router();

import { menuGet } from "../../controllers/customer/menuController.js";
router.route("/:kitchenID/:tiffinID").get(menuGet);

export default router;
