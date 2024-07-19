import Router from "express";
import { adminAuthMiddleware } from "../../middleware/adminMiddleware.js";
import { getTiffinList } from "../../controllers/admin/tiffinController.js";
import { menuGet } from "../../controllers/customer/menuController.js";
const router = Router();

router.route("/list/:providerID").get(getTiffinList);
router.route("/menu/:tiffinID").get(menuGet);

export { router as adminTiffinRouter };
