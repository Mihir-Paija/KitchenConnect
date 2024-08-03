import { Router } from "express";
const router = Router();

import { addAddress } from "../../controllers/customer/addAddressController.js";

router.route("/:customerID").post(addAddress);

export default router;
