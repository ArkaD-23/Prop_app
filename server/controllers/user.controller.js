import { errorHandeler } from "../utils/error";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
    if(req.user.id != req.params.id) 
        return errorHandeler(400,"You can update your profile only.....");
    try {
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.parsms.id,
            {
                $set : {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                }
            } , { new : true },
        );
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}