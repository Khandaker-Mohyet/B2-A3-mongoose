"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrow = exports.createBorrow = void 0;
const borrow_model_1 = __importDefault(require("./borrow.model"));
const books_model_1 = __importDefault(require("../books/books.model"));
const createBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = yield books_model_1.default.findById(bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        else if (book.copies < quantity) {
            res.status(400).json({
                success: false,
                message: `Only ${book.copies} copies are available`,
            });
        }
        else {
            // Update book copies and availability
            book.copies -= quantity;
            book.updateAvailability();
            yield book.save();
            // Create borrow entry
            const borrow = yield borrow_model_1.default.create({
                book: book._id,
                quantity,
                dueDate,
            });
            res.status(201).json({
                success: true,
                message: "Book borrowed successfully",
                data: borrow,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to borrow book",
            error,
        });
    }
});
exports.createBorrow = createBorrow;
const getBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.default.aggregate([
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve summary",
            error: error,
        });
    }
});
exports.getBorrow = getBorrow;
