import express from 'express'
import {createNote,deleteNote,getAllNotes,getNote} from '../controllers/notesController'

const router = express.Router()


router.post('/createnote',createNote)
router.post('/getallnotes',getAllNotes)
router.post('/getnote',getNote)
router.post('/deletenote',deleteNote)

export default router