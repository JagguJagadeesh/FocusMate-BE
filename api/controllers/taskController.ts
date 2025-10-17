import { PrismaClient } from "@prisma/client";
import { Request , Response } from "express";

const prisma = new PrismaClient();

const addTask = async (req: Request,res: Response) => {
    try {
        const { userID , title , start , category } = req.body;
        const createTask = await prisma.task.create({
            data: {
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

const getTaskStats = async (req: Request, res: Response) => {
  try {
    const { userID } = req.body

    if (!userID) {
      return res.status(400).json({ error: 'Missing userID' })
    }

    const user = await prisma.user.findUnique({
      where: { id: userID },
      select: { tasksDone: true },
    })

    const pendingCount = await prisma.task.count({
      where: { userID },
    })

    return res.status(200).json({
      completed: user?.tasksDone ?? 0,
      pending: pendingCount,
    }) as any 
  } catch (e) {
    console.log('Error fetching task stats:', e)
    res.status(500).json({ error: 'Failed to get task stats' })
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

const updateTask = async (req: Request, res: Response) => {
  try {
    const { id, start, completed, title, category } = req.body;
    
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...(start && { start }),
        ...(completed !== undefined && { completed }),
        ...(title && { title }),
        ...(category && { category }),
      }
    });

    res.status(200).json({ message: 'Updated task', task: updatedTask });
  } catch (e) {
    console.log("Error updating task", e);
    res.status(500).json({ error: 'Error updating task' });
  }
};

const markTaskAsDone = async (req: Request, res: Response) => {
  try {
    const { taskId, userID } = req.body;

    // 🔍 Validate input
    if (!taskId || !userID) {
      return res.status(400).json({ error: "Missing taskId or userID" });
    }

    // ✅ Delete the task
    const deleted = await prisma.task.delete({
      where: { id: taskId },
    });

    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }

    // ✅ Increment tasksDone in User model
    await prisma.user.update({
      where: { id: userID },
      data: {
        tasksDone: {
          increment: 1,
        },
      },
    });

    res.status(200).json({ message: "Task marked as done and deleted" });

  } catch (e) {
    console.error("❌ Error marking task as done:", e);
    return res.status(500).json({ error: "Could not mark task as done" }) as any
  }
};



export { addTask , getAllTasks , deleteTask , updateTask , markTaskAsDone , getTaskStats}