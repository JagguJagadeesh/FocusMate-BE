import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Request , Response } from "express";


const prisma = new PrismaClient()

// Generating Token
function generateToken(id: string){
    return jwt.sign({id},process.env.JWT_KEY!,{expiresIn:"5h"})
}

// SignUp
const signup = async (req: Request,res: Response) => {
    try {
        const {name , email , password} = req.body
        if(!name || !email || !password) return res.status(401).json({message:'Missing Feilds'});

        const checkUser = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(checkUser) return res.status(500).json({message:'User already Existed'});

        const hashpass = await bcrypt.hash(password,10)
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password: hashpass
            }
        })
        const token = generateToken(user.id)

        return res.cookie("token", token, {
        httpOnly: true,
        secure: true,         
        sameSite: 'none',    
        maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
            message: `User ${user.name} is Created Successfully`,user:{id:user.id,name:user.name,email:user.email}
        }) as any

    } catch (e) {
        console.log('Error at Signup',e)
    }
}

// Sigin
const sigin = async (req: Request,res: Response) => {
    try {
        const {email , password} = req.body
        if(!email || !password) return res.status(401).json({message:'Missing Feilds'});

        const checkUser = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!checkUser) return res.status(500).json({message:'User Not found'});

        const verifypass = await bcrypt.compare(password,checkUser.password)
        if(!verifypass) return res.status(500).json({message:'password is incorret'});

        const token = generateToken(checkUser.id)

        return res.cookie("token", token, {
        httpOnly: true,
        secure: true,         
        sameSite: 'none',    
        maxAge: 7 * 24 * 60 * 60 * 1000,
        }).status(200).json({message:`User ${checkUser.name} is Logined Sucessfully`,user:{id:checkUser.id,name:checkUser.name,email:checkUser.email}}) as any

    } catch (e) {
        console.log('Error at Signup',e)
    }
}

const logout = async (req: Request,res: Response) => {
    try {

        res.clearCookie('token')
        return res.status(200).json({message:`User Logged Successfuly`}) as any

    } catch (e) {
        console.log('Error at Signup',e)
    }
}


export { signup , sigin , logout}