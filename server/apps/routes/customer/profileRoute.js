import { Router } from "express";
import {
  editPersonalDetails,
  getCustomerProfile,
} from "../../controllers/customer/profileController.js";

const router = Router();

router
  .route("/details/:customerID")
  .patch(editPersonalDetails)
  .get(getCustomerProfile);

export default router;
