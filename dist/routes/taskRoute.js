"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
router.post('/addtask', taskController_1.addTask);
router.post('/getalltasks', taskController_1.getAllTasks);
router.post('/deletetask', taskController_1.deleteTask);
exports.default = router;
