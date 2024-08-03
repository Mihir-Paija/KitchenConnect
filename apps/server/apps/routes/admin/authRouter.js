import Router from 'express'
import { adminSignup, adminLogin } from '../../controllers/admin/authController.js';
const router = Router();

router.route('/signup').post(adminSignup)
router.route('/login').post(adminLogin)

export {router as adminAuthRouter} 