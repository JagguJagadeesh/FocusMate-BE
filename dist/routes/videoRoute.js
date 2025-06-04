"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const videosController_1 = require("../controllers/videosController");
const router = (0, express_1.Router)();
router.post('/addvideo', videosController_1.addVideo);
router.post('/getallvideos', videosController_1.getAllVideos);
router.post('/deletevideo', videosController_1.deleteVideo);
exports.default = router;
