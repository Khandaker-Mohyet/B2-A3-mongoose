import express from "express"
import cors from "cors"
import config from "./config"
import mongoose from "mongoose"


const app = express()

app.use(cors())
app.use(express.json())




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