import { Router } from "express";
import { addBook, deleteBook, getAllBooks } from "../controllers/bookController";

const route = Router();


route.post('/addbook',addBook);
route.post('/deletebook',deleteBook);
route.post('/getallbooks',getAllBooks);


export default route;