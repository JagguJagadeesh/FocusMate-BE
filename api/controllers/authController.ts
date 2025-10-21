import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Request , Response } from "express";


const prisma = new PrismaClient()

// Generating Token
function generateToken(id: string){
    return jwt.sign({id},process.env.JWT_KEY!,{expiresIn:"7d"})
}

// SignUp Controller
const signup = async (req: Request,res: Response): Promise<void> => {
    try {
        const {name , email , password} = req.body
        if(!name || !email || !password) res.status(400).json({message:'All fields are required. '});

        const checkUser = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(checkUser) res.status(409).json({message:'User already exists. '});

        const hashpass = await bcrypt.hash(password,10)
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password: hashpass
            },
            select:{
                id:true,name:true,email:true
            }
        })
        const token = generateToken(user.id)

        res
        .status(200)
        .json({
            message: `Welcome aboard, ${user.name}!`,
            token,
            user
        })

    } catch (e) {
        console.error('{SIGNUP_ERROR}',e)
        res.status(500).json({message: "Internal server error."})
    }
}

// Sigin
const sigin = async (req: Request,res: Response): Promise<void> => {
    try {
        const {email , password} = req.body
        if(!email || !password) res.status(400).json({message:'Email and Password are missing.'});

        const checkUser = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!checkUser) {
            res.status(404).json({message:'User Not found.'});
            return
        }

        const verifypass = await bcrypt.compare(password.toString(),checkUser.password)
        if(!verifypass) {
            res.status(401).json({message:'Incorrect password.'});
            return
        }

        const token = generateToken(checkUser.id)
        res.status(200).json({message:`Welcome back, ${checkUser.name}!`,
            token,
            user:checkUser});

    } catch (e) {
        console.log('{SIGNIN_ERROR}',e)
        res.status(500).json({message:"Internal server error."})
    }
}



export { signup , sigin }