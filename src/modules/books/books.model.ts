import { model, Schema } from "mongoose";
import { IBook } from "./books.interface";


const bookSchema = new Schema<IBook>({
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
    required: true
 },
 description:{
    type:String,
    required: true
 },
 copies:{
    type:Number,
    required: true
 },
 available:{
    type:Boolean,
    required: true
 },
},
{
    timestamps: true,
    versionKey: false
}
)

const Books = model("Books",bookSchema)

export default Books;