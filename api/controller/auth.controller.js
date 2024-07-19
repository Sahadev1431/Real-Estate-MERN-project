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

  if (password.length < 8) {
    return next(
      errorHandler(400, "Password Must Contain Atleast 8 Character!")
    );
  }
  // password = password.toString();
  const hashedPassword = bcryptjs.hashSync(password, 10);
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
    const {password : pass, ...rest} = validUser._doc
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {}
};
