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
exports.deleteVideo = exports.addVideo = exports.getAllVideos = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ownerID, title, link } = req.body;
        const createVideo = yield prisma.video.create({
            data: {
                ownerID,
                title,
                link
            }
        });
        res.status(201).json({ message: "Video created successfully" });
    }
    catch (e) {
        console.log("error at add video", e);
        res.status(500).json({ message: 'error adding video', error: e });
    }
});
exports.addVideo = addVideo;
const getAllVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ownerID } = req.body;
        const allVideos = yield prisma.video.findMany({
            where: {
                ownerID,
            }
        });
        res.status(201).json({ message: "getting data successfully", data: allVideos });
    }
    catch (e) {
        console.log("error at add video");
        res.status(500).json({ message: 'error adding video', error: e });
    }
});
exports.getAllVideos = getAllVideos;
const deleteVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Video ID is required.' });
        }
        const deletedVideo = yield prisma.video.delete({
            where: { id },
        });
        return res.status(200).json({ message: 'Video deleted successfully.', deletedVideo });
    }
    catch (e) {
        console.error('Error deleting video:', e);
        return res.status(500).json({ message: 'Error deleting video.', error: e });
    }
});
exports.deleteVideo = deleteVideo;
