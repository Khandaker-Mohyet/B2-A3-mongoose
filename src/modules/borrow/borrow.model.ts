import { model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";


const borrowSchema = new Schema<IBorrow>({
    book:{
        type: Schema.Types.ObjectId,
        ref: "Books",
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    dueDate:{
        type: Date,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
}
)


const Borrow = model("Borrow", borrowSchema)

export default Borrow;