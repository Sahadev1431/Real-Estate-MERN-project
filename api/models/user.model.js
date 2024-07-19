import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate : [validator.isEmail,"Please Provide a Valid Email!"]
    },
    password : {
        type : String,
        required : true,
    }
},{timestamps : true})

const User = mongoose.model("User",userSchema)

export default User
