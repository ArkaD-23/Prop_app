import { errorHandeler } from "../utils/error.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  try {
    res.json({
      message: "Server is working....",
    });
  } catch (error) {
    return next(errorHandeler(404, "Internal server error !"));
  }
};

export const addToFavourites = async (req, res, next) => {
  const { id } = req.body;
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.favourites.includes(id)) {
        return res.status(400).json({ message: "Already in favourites" , favourites: user.favourites});
      }
      user.favourites.push(id);
      await user.save();
      return res
        .status(200)
        .json({ message: "Added to favourites", favourites: user.favourites });
    } catch (error) {
      console.error(error);
      return next(errorHandeler(404, "Server error !"))
    }
}

export const removeFavourite = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await User.findById(req.params.id);
    if(!user) {
      return next(errorHandeler(404, "User not found !"));
    }
    if(!user.favourites.includes(id)) {
      return next(errorHandeler(404, "The listing is not in favourites !"));    
    }
    user.favourites = user.favourites.filter(fav => fav !== id);
    await user.save();
    return res.status(200).json({message:"Listing removed from favourites .", favourites:user.favourites});
  } catch (error) {
    return next(errorHandeler(400, "Server error !"));
  }
}

export const updateUser = async (req, res, next) => {
  try {
    let hashedPassword;
    if (req.user.id !== req.params.id) {
      return next(errorHandeler(401, "You can update only your account."));
    }
    if (req.body.contact_no) {
      const number = /^[6-9]\d{9}$/;
      if (!number.test(req.body.contact_no)) {
        return next(
          errorHandeler(401, "Please provide a valid contact number !")
        );
      }
    }
    if (req.body.email) {
      const emailChecker = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailChecker.test(req.body.email)) {
        return next(
          errorHandeler(401, "Please provide a valid email address!")
        );
      }
    }
    if (req.body.password) {
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordPattern.test(req.body.password)) {
        return next(
          errorHandeler(
            401,
            "Please provide a password that satisfies the required format !"
          )
        );
      }
      hashedPassword = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          contact_no: req.body.contact_no,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    return next(errorHandeler(404, "Something went wrong !"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id != req.params.id) {
    return next(errorHandeler(401, "You can delete only your own account!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token").status(200).json("User has been deleted!");
  } catch (error) {
    return next(errorHandeler(404, "Something went wrong !"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user) {
      next(errorHandeler(404, "User not found !"));
    }
    res.json({status: 200, user:user, message: "User found and sent"});
  } catch (error) {
     return next(errorHandeler(404, error.message));
  }
}
