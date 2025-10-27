import { PrismaClient } from "@prisma/client";
import cloudinary from "../utils/cloudinary";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const uploadingFile = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const { handlerId, name } = req.body;
    if (!file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const fileBuffer = `data:${file?.mimetype};base64,${file?.buffer.toString(
      "base64"
    )}`;

    const result = await cloudinary.uploader.upload(fileBuffer, {
      resource_type: "raw",
      folder: "focusmate_pdfs",
    });
    const pdf = await prisma.file.create({
      data: {
        handlerId,
        name,
        url: result.secure_url,
        publicId: result.public_id,
      },
    });

    res.status(200).json({ message: "File uploaded" });
  } catch (e) {
    console.log(e);
    res.status(500).json("Upload Failed");
  }
};

const getFiles = async (req: Request, res: Response) => {
  try {
    const { handlerId } = req.params;

    const files = await prisma.user.findUnique({
      where: {
        id: handlerId,
      },
      select: {
        files: true,
      },
    });
    if (!files) {
      res.status(400).json({ message: "files are not found" });
      return;
    }
    res.status(200).json({ message: "fetched files", files });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const deleteFile = async (req: Request, res: Response) => {
  try {
    const { handlerId, id } = req.body;

    if (!id) {
      res.status(400).json({ message: "File ID is required" });
      return;
    }

    const file = await prisma.file.findUnique({
      where: { id },
      select: {
        id: true,
        handlerId: true,
        publicId: true,
      },
    });

    if (!file) {
      res.status(404).json({ message: "File not found" });
      return;
    }

    if (file.handlerId !== handlerId) {
      res.status(403).json({ message: "Unauthorized to delete this file" });
      return;
    }

    await cloudinary.uploader.destroy(file.publicId, { resource_type: "raw" });

    await prisma.file.delete({ where: { id } });

    res.status(200).json({ message: "File deleted successfully" });
  } catch (e) {
    console.error("{ERROR_DELETING_FILE}", e);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { uploadingFile, getFiles, deleteFile };
