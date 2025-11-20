import { Router } from "express";

//route
import addBook from "../Controllers/addBook.Controller";

const createBook = Router()

// ENDPOINT : /api/addBook
createBook.post('/addBook',addBook )

export default createBook