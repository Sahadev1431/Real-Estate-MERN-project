import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import Listing from "../models/listing.model.js"

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

export const deleteUser=  async (req,res,next) => {
    if (req.user.id !=req.params.id) return next(errorHandler(400,"You Can Only Delete Your Own Account!"));

    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie("access_token")
        res.status(200).json({
            success : true,
            message : "Account Has Been Deleted Successfully!"
        })
    } catch (error) {
        return next(error)
    }
}


export const getUserListing = async (req,res,next) => {
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({userRef : req.params.id})
            res.status(200).json(listings)
        } catch (error) {
            next(error)
        }
    } else {
        return next(errorHandler(401,"You can Only View Your Own Listings!"))
    }
}