import { errorHandeler } from "../utils/error.js";
import Listing from "../models/listings.model.js"; 

export const createlisting = async (req, res, next) => {
  const {name,description,address,Price,bathrooms,bedrooms,parking,offer,imageUrls,Realtor,} = req.body;

  try {
    const alreadyListed = await Listing.findOne({ address });
    if(alreadyListed) {
      return next(errorHandeler("This address has already been listed"));
    }
  } catch (error) {
    return next(errorHandeler(error));
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
    });
    await newListing.save();

    res.json({
      status: 200,
      data: newListing,
      message: "Listing created successfully!",
    });
  } catch (error) {
    return next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const offer = req.query.offer !== undefined && req.query.offer !== 'false' ? req.query.offer === 'true' : undefined;
    const parking = req.query.parking !== undefined && req.query.parking !== 'false' ? req.query.parking === 'true' : undefined;
    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;

    const whereClause = {
      name: { $regex: searchTerm, $options: 'i' }, 
      ...(offer !== undefined && { offer }),
      ...(parking !== undefined && { parking }),
    };

    const listings = await Listing.find(whereClause)
      .sort({ [sort]: order })
      .skip(startIndex)
      .limit(limit);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
