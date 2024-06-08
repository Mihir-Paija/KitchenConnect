import Router from 'express'
//import test from '@/test.js'
import {providerSignUpGet, providerSignUpPost, providerLoginGet, providerLoginPost, providerLogoutGet, getProfile} from '../../controllers/provider/authController.js'
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { sendStatus } from '../../controllers/provider/authController.js';


const router = Router();

router.route('/signup').get(providerSignUpGet).post(providerSignUpPost)
router.route('/login').get(providerLoginGet).post(providerLoginPost)
router.route('/logout').get(providerLogoutGet)
router.route('/:id').get(authMiddleware, getProfile)
router.route('/:id').post(authMiddleware,sendStatus)


export {router as providerAuthRouter} 