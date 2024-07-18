import Router from "express";
import { adminAuthMiddleware } from "../../middleware/adminMiddleware.js";
import {
  getCustomerCount,
  getCustomerDetails,
} from "../../controllers/admin/customerController.js";
const router = Router();

router.route("/count").get(getCustomerCount);
router.route("/details/:email").get(getCustomerDetails);

export { router as adminCustomerRouter };
