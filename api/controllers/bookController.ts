import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const addBook = async (req: Request, res: Response) => {
  try {
    const { id, bookId } = req.body;
    if (!bookId || !id) {
      res.status(404).json({ message: "Invalid inputs" });
      return;
    }
    const findUser = await prisma.user.findUnique({ where: { id } });
    if (!findUser) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    if (findUser.books.includes(bookId)) {
      res.status(401).json({ message: "Book already in the list" });
      return;
    }

    await prisma.user.update({
      where: { id },
      data: {
        books: {
          push: bookId,
        },
      },
    });
    res.status(200).json({ message: "Book added successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "[Error at adding book]" });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id, bookId } = req.body;
    if (!id || !bookId) {
      res.status(404).json({ message: "Invaild inputs" });
      return;
    }
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        books: true,
      },
    });
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    const updateBook = user?.books.filter((b) => b !== bookId);
    await prisma.user.update({
      where: { id },
      data: {
        books: updateBook,
      },
    });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (e) {
    console.log("{ERROR_DELETING_BOOK");
    res.status(500).json({ message: "Internal Server error" });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const findUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!findUser) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "fetched data succesfully", books: findUser.books });
  } catch (e) {
    console.log("{ERROR_GETBOOKS}");
    res.status(500).json({ message: "Internal Server error" });
  }
};

export { addBook, deleteBook, getAllBooks };
