import Router from 'express'
//import test from '@/test.js'
import {providerSignUpGet, providerSignUpPost, providerLoginGet, providerLoginPost, providerLogoutGet} from '../../controllers/provider/authController.js'


const router = Router();

router.route('/signup').get(providerSignUpGet).post(providerSignUpPost)
router.route('/login').get(providerLoginGet).post(providerLoginPost)
router.route('/logout').get(providerLogoutGet)


export {router as providerAuthRouter} 