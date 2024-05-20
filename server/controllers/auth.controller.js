import User from "../models/user.model.js";
import { errorHandeler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return errorHandeler(400, "Please fill up all the fields");
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(200).json({ message: "User created successfully......." });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser)
            return next(errorHandeler(404, "User not found."));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword)
            return next(errorHandeler(401, "Wrong credentials."));
        const token = jwt.sign({id: validUser._id} , process.env.JWT_SECRET);
        const { password:hashedPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        res
            .cookie('access_token', token, { httpOnly: true, expires: expiryDate})
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
}