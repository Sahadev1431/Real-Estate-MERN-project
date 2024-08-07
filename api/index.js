import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser'
import path from 'path'

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

const __dirname = path.resolve();

const app = express()
app.use(express.json())
app.use(cookieParser())


app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/listing",listingRouter)

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

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