import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json({ massage: "Successfully fetched events", events });
  } catch (e) {
    // console.log(e)
    res.status(500).json({ Error: e });
  }
};

const createEvent = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body) res.status(400).json({ message: "Invalid Entry" });
    const createdEvent = await prisma.event.create({
      data: {
        title: body.title,
        date: new Date(body.date),
        location: body.location,
        type: body.type,
        category: body.category,
        desc: body.desc,
        price: body.price,
        capacity: body.capacity,
        image: body.image,
        tags: body.tags,
        difficulty: body.difficulty,
        organizerID: body.organizerID,
        parIDs: body.parIDs || [], // safe default empty array
      },
    });
    if (!createEvent)
      res.status(400).json({ message: "Error creating Event " });
    res.status(200).json({ message: "Event created Successfully" });
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) res.status(400).json({ message: "Invalid event id" });
    const event = await prisma.event.findUnique({
      where: {
        id,
      },
    });
    if (!event) res.status(400).json({ message: "Event not found" });
    await prisma.event.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "Event Deleted" });
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const addParticipant = async (req: Request, res: Response) => {
  try {
    const { id, participantId } = req.body;
    const event = await prisma.event.findUnique({
      where: { id },
    });
    if (!event) res.status(201).json({ message: "Event doesn't exists" });
    const participant = await prisma.event.findUnique({
      where: {
        id,
        parIDs: {
          has: participantId,
        },
      },
    });
    if (participant)
      res.status(300).json({ message: "Already registered to event" });
    const added = await prisma.event.update({
      where: { id },
      data: {
        parIDs: {
          push: participantId,
        },
        registered: {
          increment: 1,
        },
      },
    });
    if (!added) res.status(300).json({ message: "Having problem in register" });
    res.status(200).json({ message: "Registration done successfully" });
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

export { getAllEvents, createEvent, deleteEvent, addParticipant };
