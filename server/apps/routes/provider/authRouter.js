import Router from 'express'
//import test from '@/test.js'
import {providerSignUpGet, providerSignUpPost} from '../../controllers/provider/signupController.js'
import {providerLoginGet, providerLoginPost} from '../../controllers/provider/loginController.js'

const router = Router();

router.route('/signup').get(providerSignUpGet).post(providerSignUpPost)
router.route('/login').get(providerLoginGet).post(providerLoginPost)


export {router as providerAuthRouter} 