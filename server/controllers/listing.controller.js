import { errorHandeler } from "../utils/error.js";
import Listing from "../models/listings.model.js";
import Stripe from "stripe";

export const createlisting = async (req, res, next) => {
  const {
    name,
    description,
    address,
    Price,
    bathrooms,
    bedrooms,
    parking,
    offer,
    imageUrls,
    Realtor,
    coordinates,
    userRef
  } = req.body;

  const alreadyListed = await Listing.findOne({ address });
  if (alreadyListed) {
    return next(errorHandeler(403, "This address has already been listed"));
  }

  try {
    const newListing = new Listing({
      name,
      description,
      address,
      Price,
      bathrooms,
      bedrooms,
      parking,
      offer,
      imageUrls,
      Realtor,
      coordinates,
      userRef,
    });
    await newListing.save();

    res.json({
      status: 200,
      data: newListing,
      message: "Listing created successfully!",
    });
  } catch (error) {
    return next(errorHandeler(error));
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const offer =
      req.query.offer !== undefined && req.query.offer !== "false"
        ? req.query.offer === "true"
        : undefined;
    const parking =
      req.query.parking !== undefined && req.query.parking !== "false"
        ? req.query.parking === "true"
        : undefined;
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const whereClause = {
      name: { $regex: searchTerm, $options: "i" },
      ...(offer !== undefined && { offer }),
      ...(parking !== undefined && { parking }),
    };

    const listings = await Listing.find(whereClause)
      .sort({ [sort]: order })
      .skip(startIndex)
      .limit(limit);

    return res.status(200).json(listings);
  } catch (error) {
    next(errorHandeler(error));
  }
};

export const getOneListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandeler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    return next(errorHandeler(error));
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandeler(404, "Listing not found!"));
  };

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name:req.body.name,
          description:req.body.description,
          address:req.body.address,
          Price:req.body.Price,
          bathrooms:req.body.bathrooms,
          bedrooms:req.body.bedrooms,
          parking:req.body.parking,
          offer:req.body.offer,
          imageUrls:req.body.imageUrls,
          Realtor:req.body.Realtor,
          coordinates:req.body.coordinates,
        },
      },
      { new: true }
    );
    res.status(200).json({data:updatedListing , message:"Listing has been updated!"});
  } catch (error) {
    next(errorHandeler(404, "Something went wrong!"));
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandeler(404, "Listing not found!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(errorHandeler(error));
  }
};

export const paymentSession = async (req, res, next) => {
  const listing = await Listing.findById(req.body.id);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  if (!listing) {
    return next(errorHandeler(404, "Listing not found!"));
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "inr",
          product_data: {
            name: listing.name
          },
          unit_amount: listing.Price, // Stripe expects the amount in the smallest currency unit
        },
        quantity: 1,
      }],
      success_url: "https://your-success-url.com",
      cancel_url: "https://your-cancel-url.com",    
    });
    res.status(200).json({ url: session.url });
  } catch (error) {
    next(errorHandeler(500, error.message)); // Adjust the status code as needed
  }
};
