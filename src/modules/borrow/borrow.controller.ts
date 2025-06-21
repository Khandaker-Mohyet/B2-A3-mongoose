import { Request, Response } from "express";
import Borrow from "./borrow.model";
import Books from "../books/books.model";



export const createBorrow = async (req:Request, res:Response)=>{

    try {
    const { book: bookId, quantity, dueDate } = req.body;
    

    const book = await Books.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${book.copies} copies are available`,
      });
    }

    book.copies -= quantity;
    book.updateAvailability();
    await book.save();

   
    const borrow = await Borrow.create({
      book: book._id,
      quantity,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to borrow book",
      error: error,
    });
  }
}

export const getBorrow = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      // Step 1: Group by book & sum quantity
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      // Step 2: Lookup to book details
      {
        $lookup: {
          from: "books", 
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      // Step 3: Unwind the bookDetails array
      {
        $unwind: "$bookDetails",
      },
      // Step 4: Final shape
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve summary",
      error: error,
    });
  }
};