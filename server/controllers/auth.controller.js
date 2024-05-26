import { errorHandeler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../db/db.config.js";

export const signup = async (req, res, next) => {
    const { username, email, password, contact_no} = req.body;
    if (!username || !email || !password || !contact_no) {
        return errorHandeler(400, "Please fill up all the fields");
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    try {
        const newUser = await prisma.user.create({
            data:{
                username:username,
                email:email,
                password:hashedPassword,
                contact_no:contact_no
            }
        })
        res.json({status:200, data:newUser, message: "User created successfully......." });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if (!validUser)
            return next(errorHandeler(404, "User not found."));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword)
            return next(errorHandeler(401, "Wrong credentials."));
        const token = jwt.sign({id: validUser.id} , process.env.JWT_SECRET);
        const { password:hashedPassword, ...rest } = validUser;
        const expiryDate = new Date(Date.now() + 3600000);
        res
            .cookie('access_token', token, { httpOnly: true, expires: expiryDate})
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
}