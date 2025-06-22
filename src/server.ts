import express from "express"
import cors from "cors"
import config from "./config"
import mongoose from "mongoose"
import { bookRouter } from "./modules/books/books.route"
import { borrowRouter } from "./modules/borrow/borrow.route"




const app = express()

app.use(cors())
app.use(express.json())



app.use(bookRouter)
app.use(borrowRouter)



app.get("/",(req,res)=>{
    res.send({success: true, message:"Khandaker Mohyet Assignment Work station"})
})




async function server() {
    try {
        await mongoose.connect(config.database_url!)
        console.log(`mongoose connected on port ${config.port}`)

        app.listen(config.port, () => {
            console.log("Khandaker Server is Running Successfully")
        })

    } catch (error) {
        console.log(error)
    }
}

server()