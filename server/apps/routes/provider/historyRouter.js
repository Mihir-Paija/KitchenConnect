import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { getHistory } from "../../controllers/provider/historyController.js";

const router = Router();

router.route('/:id/get').get(authMiddleware, getHistory)

export {router as providerHistoryRouter}