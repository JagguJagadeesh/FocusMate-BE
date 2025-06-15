import { Router } from "express";
import { addTask, deleteTask, getAllTasks } from '../controllers/taskController';

const router = Router()

router.post('/addtask',addTask);
router.post('/getalltasks',getAllTasks);
router.post('/deletetask',deleteTask);

export default router
