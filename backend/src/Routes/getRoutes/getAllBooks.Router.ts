import { Router } from "express";

//route
import allBooks from "../../Controllers/getAllBooks.Controller";

const getAllBooks = Router()

getAllBooks.get('/getBooks',allBooks )

export default getAllBooks