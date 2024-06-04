import { Router } from "express";
import { getTiffins, addTiffins, editTiffin, deleteTiffin, deactivateTiffin } from "../../controllers/provider/tiffinController.js";
import { authMiddleware, tiffinMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

router.route('/:id').get(authMiddleware, getTiffins).post(authMiddleware, addTiffins)
router.route('/:id/:tiffinID').patch(authMiddleware, tiffinMiddleware, editTiffin).delete(authMiddleware, tiffinMiddleware, deleteTiffin)
router.route('/:id/:tiffinID/deactivate').get(authMiddleware, tiffinMiddleware, deactivateTiffin)

export  {router as tiffinRouter}