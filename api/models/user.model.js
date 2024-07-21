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
    },
    avtar : {
        type : String,
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
},{timestamps : true})

const User = mongoose.model("User",userSchema)

export default User
