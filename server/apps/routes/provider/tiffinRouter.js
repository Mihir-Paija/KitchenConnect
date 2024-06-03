import { Router } from "express";
import { getTiffins, addTiffins, editTiffin, deleteTiffin, deactivateTiffin } from "../../controllers/provider/tiffinController.js";

const router = Router();

router.route('/:id').get(getTiffins).post(addTiffins)
router.route('/:id/:tiffinID').patch(editTiffin).delete(deleteTiffin)
router.route('/:id/:tiffinID/deactivate').get(deactivateTiffin)

export  {router as tiffinRouter}