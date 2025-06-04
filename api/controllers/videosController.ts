import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

const addVideo = async (req: Request,res: Response) => {
    try {
        const {ownerID,title,link} = req.body
        const createVideo = await prisma.video.create({
            data: {
                ownerID,
                title,
                link
            }
        })
        res.status(201).json({ message: "Video created successfully"});
    } catch (e) {
        console.log("error at add video",e)        
        res.status(500).json({message:'error adding video',error:e})
    }
}

const getAllVideos = async (req: Request,res: Response) => {
    try {
        const {ownerID} = req.body
        const allVideos = await prisma.video.findMany({
            where: {
                ownerID,
            }
        })
        res.status(201).json({ message: "getting data successfully",data: allVideos});
    } catch (e) {
        console.log("error at add video")        
        res.status(500).json({message:'error adding video',error:e})
    }
}


const deleteVideo = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Video ID is required.' });
    }

    const deletedVideo = await prisma.video.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Video deleted successfully.', deletedVideo }) as any
  } catch (e) {
    console.error('Error deleting video:', e);
    return res.status(500).json({ message: 'Error deleting video.', error: e });
  }
};


export { getAllVideos , addVideo , deleteVideo}