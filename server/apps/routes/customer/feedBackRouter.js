import { Router } from "express";
const router = Router();
import {
  feedBackPost,
  feedBackKitchenGET,
  feedBackTiffinGET,
} from "../../controllers/customer/feedBackController.js";

router.route("/:customerID/:kitchenID/:tiffinID").post(feedBackPost);
router.route("/:customerID/:kitchenID").get(feedBackKitchenGET);
router.route("/:customerID/:kitchenID/:tiffinID").get(feedBackTiffinGET);
export default router;
