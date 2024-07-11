import { errorHandeler } from "../utils/error.js";
import User from "../models/user.model.js";
import Listing from "../models/listings.model.js";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: "true",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_EMAIL_PASS,
  },
});

export const emailSender = async (req, res, next) => {
  const { senderEmail, recipientEmail, subject, text } = req.body; 

  const receiver = {
    from: senderEmail, 
    to: recipientEmail, 
    subject: subject, 
    text: text, 
  };

  transporter.sendMail(receiver, (error, emailRes) => {
    if (error) {
      return next(errorHandeler(401, error.toString()));
    }
    res.status(200).json({ success: true, message: 'Email sent: ' + emailRes.response });
  });
};

export const addNegotiation = async (req, res, next) => {
  const { listingId , Min_Price , Max_Price } = req.body;
    try {
      const buyer = await User.findById(req.params.id);
      const listing = await Listing.findById(listingId);
      const seller = await User.findById(listing.userRef);
      if (!buyer) {
        return next(errorHandeler(404, "Buyer not found !"));
      }
      if (!listing) {
        return next(errorHandeler(404, "Listing not found !"));
      }
      if (!seller) {
        return next(errorHandeler(404, "Seller not found !"));
      }
      if (!(seller.priceRangeMap instanceof Map)) {
        seller.priceRangeMap = new Map(Object.entries(seller.priceRangeMap));
      }
      seller.priceRangeMap.set(buyer._id, `${buyer.username} has placed a negotiation of price range Rs.${Min_Price} to Rs.${Max_Price}`);
      await seller.save();
      if (buyer.negotiations.includes(listingId)) {
        return res.status(400).json({ message: "Already in negotiations" , negotiations: buyer.negotiations});
      }
      buyer.negotiations.push(listingId);
      await buyer.save();
      return res
        .status(200)
        .json({ message: "Added to negotiations !", negotiations: buyer.negotiations });
    } catch (error) {
      console.error(error);
      return next(errorHandeler(404, "Server error !"))
    }
};

export const removeNegotiation = async (req, res, next) => {
  try {
    const { id } = req.body;
    const listing = await Listing.findById(id);
    const user = await User.findById(req.params.id);
    if(!user) {
      return next(errorHandeler(404, "User not found !"));
    }
    if(!listing) {
      return next(errorHandeler(404, "Listing not found !"));
    }
    /*if(!listing.offerPriceMap.has(user.contact_no)) {
      return next(errorHandeler(401, "This user has no offer !"));    
    }*/
    user.negotiations = user.negotiations.filter(negotiation => negotiation !== id);
    await user.save();
    listing.offerPriceMap.delete(user.contact_no);
    await listing.save();
    return res.status(200).json({message:"Listing removed from negotiations .", negotiations: user.negotiations});
  } catch (error) {
    return next(errorHandeler(400, "Server error !"));
  }
}
