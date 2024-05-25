import { Router } from "express";
import { getTiffins, addTiffins, editTiffin, deleteTiffin } from "../../controllers/provider/tiffinController.js";

const router = Router();

router.route('/:id').get(getTiffins).post(addTiffins)
router.route('/:id/:tiffinID').patch(editTiffin).delete(deleteTiffin)

export  {router as tiffinRouter}