import { model, Schema } from "mongoose";
import { IBook } from "./books.interface";


interface BookDocument extends IBook {
  updateAvailability: () => void;
};

const bookSchema = new Schema<BookDocument>({
 title:{
    type:String,
    required: true,
    trim: true
 },
 author:{
    type:String,
    required: true
 },
 genre:{
    type:String,
    required: true,
    enum: ["FICTION", "NON_FICTION" , "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]
 },
 isbn:{
    type:String,
    required: true,
    unique: true,
 },
 description:{
    type:String,
    required: false
 },
 copies:{
    type:Number,
    required: true,
    min: 0
 },
 available:{
    type:Boolean,
    default: true
 },
},
{
    timestamps: true,
    versionKey: false
}
);



bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
};

const Books = model<BookDocument>("Books", bookSchema);


export default Books;