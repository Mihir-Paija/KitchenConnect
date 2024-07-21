import Router from "express";
import { adminAuthMiddleware } from "../../middleware/adminMiddleware.js";
import {
  getCustomerCount,
  getCustomerDetails,
} from "../../controllers/admin/customerController.js";
import {
  orderDetailsAdminGet,
  orderListAdminGet,
} from "../../controllers/admin/orderController.js";
import { getSubscriptionsList } from "../../controllers/admin/subscriptionController.js";
const router = Router();

router.route("/count").get(getCustomerCount);
router.route("/details/:email").get(getCustomerDetails);
router.route("/orders/list/:customerEmail").get(orderListAdminGet);
router.route("/orders/details/:orderID").get(orderDetailsAdminGet);
router.route("/subscription/list/:customerID").get(getSubscriptionsList);
export { router as adminCustomerRouter };
