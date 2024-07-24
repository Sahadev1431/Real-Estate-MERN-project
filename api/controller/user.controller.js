import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'

export const updateUser = async (req,res,next) => {
    if(req.user.id != req.params.id) return next(errorHandler(401,"You Can Only Update Your Own Information!"));

    try {
        if (req.body.password) {
            if (req.body.password.toString().length < 8) {
                return next(errorHandler(400,"Password Must Contain 8 Characters!"))
            }
            req.body.password = bcryptjs.hashSync(req.body.password.toString(),10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id , {
            $set : {
                username : req.body.username,
                password : req.body.password,
                email : req.body.email,
                avtar : req.body.avtar
            }
        },{new : true})

        const {password,...rest} = updatedUser._doc

        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}