import express from 'express'
import { sigin,signup } from '../controllers/authController'


const router = express.Router()


router.post('/signin',sigin)
router.post('/signup',signup)

export default router