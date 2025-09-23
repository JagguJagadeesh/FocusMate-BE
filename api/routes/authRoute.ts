import express from 'express'
import { logout, sigin,signup } from '../controllers/authController'


const router = express.Router()


router.post('/signin',sigin)
router.post('/signup',signup)
router.get('/logout',logout)

export default router