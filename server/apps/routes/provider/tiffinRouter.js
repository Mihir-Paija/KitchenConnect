import { Router } from "express";
import { getLunchTiffins, addTiffins, editTiffin, deleteTiffin, deactivateTiffin } from "../../controllers/provider/tiffinController.js";
import { authMiddleware, tiffinMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

router.route('/:id/lunch').get(authMiddleware, getLunchTiffins)
router.route('/:id').post(authMiddleware, addTiffins)
router.route('/:id/:tiffinID').patch(authMiddleware, tiffinMiddleware, editTiffin).delete(authMiddleware, tiffinMiddleware, deleteTiffin)
router.route('/:id/:tiffinID/deactivate').get(authMiddleware, tiffinMiddleware, deactivateTiffin)

export  {router as tiffinRouter}