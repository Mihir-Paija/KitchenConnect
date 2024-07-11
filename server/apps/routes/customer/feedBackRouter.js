import { Router } from "express";
const router = Router();
import {
  feedBackPost,
  feedBackKitchenGET,
  feedBackTiffinGET,
} from "../../controllers/customer/feedBackController.js";

router.route("/:kitchenID").get(feedBackKitchenGET);
router.route("/:kitchenID/:tiffinID").get(feedBackTiffinGET);
router.route("/:customerID/:kitchenID/:tiffinID").post(feedBackPost);

export default router;
