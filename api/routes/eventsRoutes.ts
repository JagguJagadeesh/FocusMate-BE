import { Router } from "express";
import { addParticipant, createEvent, deleteEvent, getAllEvents, isParticipantRegistered } from "../controllers/eventController";


const route = Router()



route.get("/getallevents",getAllEvents)
route.post("/createevent",createEvent)
route.post("/addparticipant",addParticipant)
route.post("/isregistered",isParticipantRegistered)
route.delete("/deleteevent",deleteEvent)


export default route;