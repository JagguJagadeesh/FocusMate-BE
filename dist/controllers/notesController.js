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
exports.deleteNote = exports.getAllNotes = exports.getNote = exports.createNote = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ownerID, title, description, imgData } = req.body;
        const newNote = yield prisma.note.create({
            data: {
                ownerID,
                title,
                description,
                imgData,
            },
        });
        res.status(201).json({ message: "Note created successfully", note: newNote });
    }
    catch (e) {
        console.error("Error at creating notes", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createNote = createNote;
const getAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const notes = yield prisma.note.findMany({
            where: { ownerID: userId },
        });
        res.status(200).json({ notes });
    }
    catch (e) {
        console.error("Error at getting all notes", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllNotes = getAllNotes;
const getNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { noteId } = req.body;
        const note = yield prisma.note.findUnique({
            where: { id: noteId },
        });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.status(200).json({ note });
    }
    catch (e) {
        console.error("Error getting a note", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getNote = getNote;
// src/controllers/notesController.ts
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { noteId } = req.body;
        if (!noteId) {
            return res.status(400).json({ message: 'Note ID is required.' });
        }
        const deletedNote = yield prisma.note.delete({
            where: {
                id: noteId,
            },
        });
        return res.status(200).json({ message: 'Note deleted successfully.', deletedNote });
    }
    catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});
exports.deleteNote = deleteNote;
