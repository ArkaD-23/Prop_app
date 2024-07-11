import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandeler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password, contact_no, userType, favourites } = req.body;
  let priceRangeMap = new Map();
  if (!username || !email || !password || !contact_no || !userType) {
    return next(errorHandeler(401, "Please fill all the fields !"));
  };
  const emailChecker = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailChecker.test(email)) {
      return next(errorHandeler(401, "Please provide a valid email address!"));
  };
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordPattern.test(password)) {
    return next(
      errorHandeler(
        401,
        "Please provide a password that satisfies the required format !"
      )
    );
  };
  const number = /^[6-9]\d{9}$/;
  if(!number.test(contact_no)) {
    return next(errorHandeler(401, "Please provide a valid contact number !"));
  }
  const alreadyUser = await User.findOne({email});
  if(alreadyUser) return next(errorHandeler(401, "This email is already registered !"));
  const alreadyno = await User.findOne({contact_no});
  if(alreadyno) return next(errorHandeler(401, "This contact no. is already registered !"));
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    contact_no,
    userType,
    favourites,
    priceRangeMap,
  });
  try {
    await newUser.save();
    res.json({ status: 201, message: "User created successfully...." });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandeler(401, "Please fill all the fields !"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandeler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandeler(401, "Wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 36000000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  try {  
    res
      .clearCookie("access_token")
      .json({ status: 200, message: "Signout done........." });
  } catch (error) {
    return next(errorHandeler(404, "Something went wrong !"));
  }
};
