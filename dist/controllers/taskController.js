"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.getAllTasks = exports.addTask = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, title, start, category, id } = req.body;
        const createTask = yield prisma.task.create({
            data: {
                id,
                title,
                start,
                category,
                user: {
                    connect: {
                        id: userID
                    }
                }
            }
        });
        res.status(200).json({ message: "Sucessfully created Task..." });
    }
    catch (e) {
        console.log("error at add task", e);
        res.status(500).json({ error: "Error at adding Task.." });
    }
});
exports.addTask = addTask;
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.body;
        // console.log(userID)
        const tasks = yield prisma.task.findMany({
            where: {
                userID
            }
        });
        res.status(200).json({ message: 'Sucessfully..', tasks });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Error at getting Tasks' });
    }
});
exports.getAllTasks = getAllTasks;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        // console.log(id)
        if (!id) {
            res.status(400).json({ error: 'Task ID is required for deletion.' });
            return;
        }
        const tasks = yield prisma.task.delete({
            where: {
                id
            }
        });
        res.status(200).json({ message: 'Deleted Sucessfully..' });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Error at deleteing Tasks' });
    }
});
exports.deleteTask = deleteTask;
