import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
import mongoose from "mongoose";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(errorHandler(400, "Invalid Listing ID"));
    }

    const listing = await Listing.findById(id);

    if (!listing) {
      return next(errorHandler(404, "Listing Not Found!"));
    }


    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, "You Can Only Delete Your Own Listing!"));
    }

    
    await Listing.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Listing Has Been Deleted!",
    });
  } catch (error) {
    
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const { id } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(errorHandler(400, "Invalid Listing ID"));
    }

    
    const listing = await Listing.findById(id);

    
    if (!listing) {
      return next(errorHandler(404, "Listing Not Found!"));
    }

    
    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, "You Can Only Update Your Own Listing!"));
    }

    
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body, {
      new: true, 
      runValidators: true, 
    });

    
    res.status(200).json(updatedListing);
  } catch (error) {
    
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing Not Found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === "false" || offer === undefined) {
      offer = {
        $in: [true, false]
      }
    }

    let furnished = req.query.furnished;

    if (furnished === "false" || furnished === undefined) {
      furnished = {
        $in: [true, false]
      }
    }

    let parking = req.query.parking;

    if (parking === "false" || parking === undefined) {
      parking = {
        $in: [true, false]
      }
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = {
        $in: ["rent", "sale"]
      }
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listing = await Listing.find({
      name: { $regex: searchTerm, $options : "i" },
      offer,
      parking,
      furnished,
      type,
    }).sort({
      [sort]: order,
    }).limit(limit).skip(startIndex);

    return res.status(200).json(listing)
  } catch (error) {
    next(error);
  }
};
