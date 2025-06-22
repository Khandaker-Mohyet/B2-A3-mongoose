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
exports.updateBook = exports.DeleteBook = exports.getSingleBook = exports.getBook = exports.createBook = void 0;
const books_model_1 = __importDefault(require("./books.model"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = new books_model_1.default(body);
        const data = yield book.save();
        res.send({
            success: true,
            message: "Book created Successfully",
            data
        });
    }
    catch (error) {
        res.send({
            message: "Validation failed",
            success: false,
            error
        });
    }
});
exports.createBook = createBook;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookGenre = req.query.genre ? req.query.genre : "";
        let data = [];
        if (bookGenre) {
            data = yield books_model_1.default.find({ genre: bookGenre });
        }
        else {
            data = yield books_model_1.default.find().sort({ "createdAt": "asc" }).limit(10);
        }
        res.send({
            success: true,
            message: "Book created Successfully",
            data
        });
    }
    catch (error) {
        res.send({
            message: "Validation failed",
            success: false,
            error
        });
    }
});
exports.getBook = getBook;
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield books_model_1.default.findById(bookId);
        res.send({
            success: true,
            message: "Book find Successfully",
            data
        });
    }
    catch (error) {
        res.send({
            message: "Validation failed",
            success: false,
            error
        });
    }
});
exports.getSingleBook = getSingleBook;
const DeleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield books_model_1.default.findByIdAndDelete(bookId, { new: true });
        res.send({
            success: true,
            message: "Book find Successfully",
            data
        });
    }
    catch (error) {
        res.send({
            message: "Validation failed",
            success: false,
            error
        });
    }
});
exports.DeleteBook = DeleteBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const body = req.body;
        const data = yield books_model_1.default.findByIdAndUpdate(bookId, body, { new: true, runValidators: true });
        res.send({
            success: true,
            message: "Book find Successfully",
            data
        });
    }
    catch (error) {
        res.send({
            message: "Validation failed",
            success: false,
            error
        });
    }
});
exports.updateBook = updateBook;
