import { Router } from "express";
import { createBook, DeleteBook, getBook, getSingleBook, updateBook } from "./books.controller";


export const bookRouter = Router()

bookRouter.post("/api/books", createBook)
bookRouter.get("/api/books", getBook)
bookRouter.get("/api/books/:bookId", getSingleBook)
bookRouter.put("/api/books/:bookId", updateBook)
bookRouter.delete("/api/books/:bookId", DeleteBook)