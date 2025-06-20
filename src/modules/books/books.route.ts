import { Router } from "express";
import { createBook } from "./books.controller";


export const bookRouter = Router()

bookRouter.post("/create-book", createBook)