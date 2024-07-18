import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"

export const signup = async (req,res,next) => {
    const {username,email,password} = req.body
    if (!username || !email || !password) {
        return next (errorHandler(400,"Please Provide Entire Details!"))
    }
    if (password.length < 8) {
        return next(errorHandler(400,"Password Must Contain Atleast 8 Character!"))
    }
    const hashedPassword =  bcryptjs.hashSync(password, 10);    
    const newUser = new User({username,email,password : hashedPassword})
    try {
        await newUser.save()
        res.status(201).json("User Created Successfully!")
    } catch (error) {
        next(error)
    }
}