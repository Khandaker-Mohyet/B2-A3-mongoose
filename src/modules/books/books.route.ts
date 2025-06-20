import { Router } from "express";
import { createBook, getBook, getSingleBook } from "./books.controller";


export const bookRouter = Router()

bookRouter.post("/api/books", createBook)
bookRouter.get("/api/books", getBook)
bookRouter.get("/api/books/:bookId", getSingleBook)