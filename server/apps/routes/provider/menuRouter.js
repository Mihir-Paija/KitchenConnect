import { Router } from "express";
import { getMenu, addMenu, editMenu } from "../../controllers/provider/menuController.js";
import { authMiddleware, tiffinMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

router.route('/:id/:tiffinID').get(authMiddleware, tiffinMiddleware, getMenu).post(authMiddleware, tiffinMiddleware, addMenu)
router.route('/:id/:tiffinID/:menuID').patch(authMiddleware, tiffinMiddleware, editMenu)

export  {router as menuRouter}