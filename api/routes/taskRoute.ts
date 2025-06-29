import { Router } from "express";
import {
  addTask,
  deleteTask,
  getAllTasks,
  getTaskStats,
  markTaskAsDone,
  updateTask
} from "../controllers/taskController";

const router = Router();

/**
 * @route   POST /addtask
 * @desc    Add a new task for a user
 */
router.post("/addtask", addTask);

/**
 * @route   POST /getalltasks
 * @desc    Get all tasks for a specific user
 */
router.post("/getalltasks", getAllTasks);

/**
 * @route   POST /deletetask
 * @desc    Delete a task by ID
 */
router.post("/deletetask", deleteTask);

/**
 * @route   POST /updatetask
 * @desc    Update a task by ID
 */
router.post("/updatetask", updateTask);

/**
 * @route   POST /taskdone
 * @desc    Mark a task as completed and update user stats
 */
router.post("/taskdone", markTaskAsDone);

/**
 * @route   POST /get-task-stats
 * @desc    Get completed and pending task counts
 */
router.post("/get-task-stats", getTaskStats);

export default router;
