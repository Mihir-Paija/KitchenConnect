import { Router } from "express";
import { addMenu } from "../../controllers/provider/menuController.js";

const router = Router();

router.route('/:id/:tiffinID').post(addMenu)

export  {router as menuRouter}