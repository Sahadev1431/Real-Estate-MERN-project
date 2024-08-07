import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(errorHandler(400, "Please Provide Entire Details!"));
  }
  const user = await User.findOne({ email });

  if (user) {
    return next(errorHandler(400, "User With This Email Already Exist"));
  }

  if (password.toString().length < 8) {
    return next(
      errorHandler(400, "Password Must Contain Atleast 8 Character!")
    );
  }
  // password = password.toString();
  const hashedPassword = bcryptjs.hashSync(password.toString(), 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Signed Up Successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(errorHandler(400, "Please Provide Entire Details!"));
    }
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(400, "User Not Found!"));

    const validPassword = bcryptjs.compareSync(
      password.toString(),
      validUser.password
    );
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Username or Password!"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    res
      .cookie("access_token", token, { httpOnly: true , expires : expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};


export const google = async (req, res, next) => {
  try {
    const { photo, name, email } = req.body;
    const user = await User.findOne({ email });

    const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;

      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
        email: email,
        password: hashedPassword,
        avtar: photo
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;

      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};



export const signOut = (req,res,next) => {
  try {
    res.clearCookie("access_token")
    res.status(200).json({
      success : true,
      message : "User Has Been Logged Out!"
    })
  } catch (error) {
    next(error)
  }
}