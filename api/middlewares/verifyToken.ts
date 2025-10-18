import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const key = process.env.JWT_KEY as string;

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Access denied, No Token provided." });
      return;
    }
    const decoded = jwt.verify(token, key);
    next();
  } catch (e: any) {
    console.log("[VERIFY_TOKEN_ERROR]", e);
    
  }
}
