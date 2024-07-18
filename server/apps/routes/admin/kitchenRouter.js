import Router from "express";
import { adminAuthMiddleware } from "../../middleware/adminMiddleware.js";
import {
  getKitchenCount,
  getKitchenDetails,
} from "../../controllers/admin/kitchenController.js";
const router = Router();

router.route("/count").get(getKitchenCount);
router.route("/details/:email").get(getKitchenDetails);

export { router as adminKitchenRouter };
