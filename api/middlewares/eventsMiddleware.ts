import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkEventsDeletions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const now = new Date();
    await prisma.event.deleteMany({
      where: {
        date: {
          lt: now,
        },
      },
    });
    next();
  } catch (e: any) {
    console.log("[Internal server error]", e);
    res.status(500).json({ error: "Internal server error" });
  }
}
