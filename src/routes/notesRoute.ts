import express from 'express'
import {createNote,getAllNotes,getNote} from '../controllers/notesController'

const router = express.Router()


router.post('/createnote',createNote)
router.post('/getallnotes',getAllNotes)
router.post('/getnote',getNote)

export default router