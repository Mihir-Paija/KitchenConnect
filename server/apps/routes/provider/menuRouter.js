import { Router } from "express";
import { getMenu, addMenu } from "../../controllers/provider/menuController.js";
import { authMiddleware, tiffinMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

router.route('/:id/:tiffinID').get(authMiddleware, tiffinMiddleware, getMenu).post(authMiddleware, tiffinMiddleware, addMenu)

export  {router as menuRouter}