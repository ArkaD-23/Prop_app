import prisma from "../../db/db.config.js";
import { errorHandeler } from "../utils/error.js";

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
  } = req.body;
  try {
    const alreadyListed = await prisma.listing.findUnique({
      where: {
        address: address,
      },
    });
    if (alreadyListed) {
      return next(errorHandeler(400, "This address has already been listed"));
    }
  } catch (error) {
    next(error);
  }
  try {
    const newListing = await prisma.listing.create({
      data: {
        name: name,
        description: description,
        address: address,
        Price: Price,
        bathrooms: bathrooms,
        bedrooms: bedrooms,
        parking: parking,
        offer: offer,
        imageUrls: imageUrls,
        Realtor: Realtor,
      },
    });
    res.json({
      status: 200,
      data: newListing,
      message: "Listing created successfully!",
    });
  } catch (error) {
    next(error);
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
    const order = req.query.order || 'desc';
    const whereClause = {
      name: { contains: searchTerm, mode: 'insensitive' },
      ...(offer !== undefined && { offer }),
      ...(parking !== undefined && { parking }),
    };
    const listings = await prisma.listing.findMany({
      where: whereClause,
      orderBy: { [sort]: order },
      skip: startIndex,
      take: limit,
    });
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
