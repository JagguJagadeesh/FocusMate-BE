import { PrismaClient } from "@prisma/client";
import { Request , Response } from "express";

const prisma = new PrismaClient();

const addTask = async (req: Request,res: Response) => {
    try {
        const { userID , title , start , category , id} = req.body;
        const createTask = await prisma.task.create({
            data: {
                id,
                title,
                start,
                category,
                user: {
                    connect:{
                        id: userID
                    }
                }
            }
        })
        res.status(200).json({message: "Sucessfully created Task..."})
    } catch (e) {
        console.log("error at add task",e);
        res.status(500).json({error: "Error at adding Task.."})
    }
}

const getAllTasks = async (req: Request,res: Response) => {
    try {
        const { userID } = req.body;
        // console.log(userID)
        const tasks = await prisma.task.findMany({
            where: {
                userID
            }
        })
        res.status(200).json({message: 'Sucessfully..',tasks})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: 'Error at getting Tasks'})
    }
}

const deleteTask = async (req: Request,res: Response) => {
    try {
        const { id } = req.body;
        // console.log(id)
        if (!id) {
        res.status(400).json({ error: 'Task ID is required for deletion.' });
        return;
        }
        const tasks = await prisma.task.delete({
            where: {
                id
            }
        })
        res.status(200).json({message: 'Deleted Sucessfully..'})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: 'Error at deleteing Tasks'})
    }
}

export { addTask , getAllTasks , deleteTask }