import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'

dotenv.config()

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("database connected successfully")
    } catch (error) {
        console.log(error)
    }
}
dbConnection() 

const app = express()

app.use("/api/user",userRouter)

app.listen(3000,() => {
    console.log("Server listening on port 3000");
})