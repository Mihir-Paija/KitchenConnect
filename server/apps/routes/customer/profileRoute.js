import { Router } from "express";
import { editPersonalDetails } from "../../controllers/customer/profileController.js";

const router = Router();

router.route("/details/:customerID").patch(editPersonalDetails);

export default router;
