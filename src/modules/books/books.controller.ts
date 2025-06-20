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