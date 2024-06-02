import prisma from "../../db/db.config.js";
import { errorHandeler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
    res.json("Server is running successfully......");
}

export const updateUser = async (req, res, next) => {
    if (req.user.id != req.params.id)
        return next(errorHandeler(400, "You can update your profile only....."));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                contact_no: req.body.contact_no,
            },
        });
        const { password, ...rest } = updatedUser;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if(req.user.id != req.params.id) {
        return next(errorHandeler(401, "You can delete only your account!"));
    }
    try {
         await prisma.user.delete({
            where:{
                id: Number(req.params.id),
            }
        });
        res.clearCookie('access_token');
        res.json({status: 200, message: "User has been deleted........."});
    } catch (error) {
        console.log(error);
        next(errorHandeler(404, "Something went wrong!"))
    }
}

