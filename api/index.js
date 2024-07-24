import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'

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
app.use(express.json())
app.use(cookieParser())

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    // const message = err.message || "Internal Server Error"

    const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message : errorMessage
    })
})

app.listen(3000,() => {
    console.log("Server listening on port 3000");
})