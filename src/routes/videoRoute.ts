import { Router } from "express";
import { addVideo , getAllVideos , deleteVideo } from "../controllers/videosController";

const router = Router()

router.post('/addvideo',addVideo)
router.post('/getallvideos',getAllVideos)
router.post('/deletevideo',deleteVideo)


export default router
