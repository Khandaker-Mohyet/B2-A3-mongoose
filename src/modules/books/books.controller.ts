import { Request, Response } from "express";
import Books from "./books.model";



export const createBook = async (req: Request, res: Response) => {
    try {
        const body = req.body
        const book = new Books(body)
        const data = await book.save()

        res.send({
            success: true,
            message: "Book created Successfully",
            data
        })
    } catch (error) {
        console.log("server error", error)
    }
}

export const getBook = async (req: Request, res: Response) => {
    try {
        
        const data = await Books.find()

        res.send({
            success: true,
            message: "Book created Successfully",
            data
        })
    } catch (error) {
        console.log("server error", error)
    }
}

export const getSingleBook = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const data = await Books.findById(bookId)

        res.send({
            success: true,
            message: "Book find Successfully",
            data
        })
    } catch (error) {
        console.log("server error", error)
    }
}