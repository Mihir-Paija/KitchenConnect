import Router from "express";
import { SubscriptionPriceChange } from "../../controllers/admin/subscriptionController.js";
const router = Router();

router.route("/priceChange/:subscriptionID").post(SubscriptionPriceChange);
export { router as adminSubPlanRouter };
