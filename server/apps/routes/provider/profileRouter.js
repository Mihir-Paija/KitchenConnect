import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { editKitchenDetails, editPersonalDetails, changeStatus, deleteProvider } from "../../controllers/provider/profileController.js";

const router = Router();

router.route('/:id/personal').patch(authMiddleware, editPersonalDetails)
router.route('/:id/kitchen').patch(authMiddleware, editKitchenDetails)
router.route('/:id/status').patch(authMiddleware, changeStatus)
router.route('/:id').delete(authMiddleware, deleteProvider)

export {router as profileRouter}