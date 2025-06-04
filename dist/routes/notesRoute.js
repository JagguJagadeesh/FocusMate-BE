"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notesController_1 = require("../controllers/notesController");
const router = express_1.default.Router();
router.post('/createnote', notesController_1.createNote);
router.post('/getallnotes', notesController_1.getAllNotes);
router.post('/getnote', notesController_1.getNote);
router.post('/deletenote', notesController_1.deleteNote);
exports.default = router;
