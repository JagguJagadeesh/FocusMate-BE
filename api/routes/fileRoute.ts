import { Router } from "express";
import upload from "../middlewares/multerMiddleware";
import { deleteFile, getFiles, uploadingFile } from "../controllers/fileController";

const route = Router();

route.post("/uploadfile", upload.single("file"), uploadingFile);
route.get("/getfiles/:handlerId", getFiles);
route.post("/deletefile", deleteFile);

export default route;
