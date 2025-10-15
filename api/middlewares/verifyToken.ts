import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from 'jsonwebtoken'

const key = process.env.JWT_KEY as string;

// interface AuthRequest extends Request {
//     user: any;
// }

export function verifyToken(req: Request,res: Response,next: NextFunction) {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];

    if(!token){
        res.json({message: 'Token not found'})
        return;
    }
    const decoded = jwt.verify(token,key)

    // req.user = decoded;
    next()
}