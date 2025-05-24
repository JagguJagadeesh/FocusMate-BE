import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";


const prisma = new PrismaClient()


const createNote = async (req: Request, res: Response) => {
  try {
    const { ownerID, title, description, imgData } = req.body;

    const newNote = await prisma.note.create({
      data: {
        ownerID,
        title,
        description,
        imgData,
      },
    });

    res.status(201).json({ message: "Note created successfully", note: newNote });
  } catch (e) {
    console.error("Error at creating notes", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getAllNotes = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const notes = await prisma.note.findMany({
      where: { ownerID: userId },
    });

    res.status(200).json({ notes });
  } catch (e) {
    console.error("Error at getting all notes", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getNote = async (req: Request, res: Response) => {
  try {
    const { noteId } = req.body;

    const note = await prisma.note.findUnique({
      where: { id: noteId },
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({ note }) as any
  } catch (e) {
    console.error("Error getting a note", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// src/controllers/notesController.ts
const deleteNote = async (req: Request, res: Response) => {
  try {
    const { noteId } = req.body;

    if (!noteId) {
      return res.status(400).json({ message: 'Note ID is required.' });
    }

    const deletedNote = await prisma.note.delete({
      where: {
        id: noteId,
      },
    });

    return res.status(200).json({ message: 'Note deleted successfully.', deletedNote }) as any
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};





export { createNote , getNote , getAllNotes , deleteNote }