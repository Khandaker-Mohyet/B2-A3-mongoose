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
        res.send({
            message: "Validation failed",
            success: false,
            error
        })
    }
}

export const getBook = async (req: Request, res: Response) => {
    try {
        
        const bookGenre = req.query.genre?req.query.genre:"" ;

        let data = []

        if(bookGenre){
            data = await Books.find({genre: bookGenre})
        }else{
            data = await Books.find().sort({"createdAt": "asc"}).limit(10)
        }

        res.send({
            success: true,
            message: "Book created Successfully",
            data
        })
    } catch (error) {
        res.send({
            message: "Validation failed",
            success: false,
            error
        })
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
        res.send({
            message: "Validation failed",
            success: false,
            error
        })
    }
}


export const DeleteBook = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const data = await Books.findByIdAndDelete(bookId,{new:true})

        res.send({
            success: true,
            message: "Book find Successfully",
            data
        })
    } catch (error) {
        res.send({
            message: "Validation failed",
            success: false,
            error
        })
    }
}


export const updateBook = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const body = req.body
        const data = await Books.findByIdAndUpdate(bookId, body, {new:true, runValidators:true})

        res.send({
            success: true,
            message: "Book find Successfully",
            data
        })
    } catch (error) {
        res.send({
            message: "Validation failed",
            success: false,
            error
        })
    }
}


