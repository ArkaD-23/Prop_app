import prisma from "../../db/db.config";
import { errorHandeler } from "../utils/error.js";

export const createlisting = async (req, res, next) => {
    const { name, description, address, Price, bathrooms, bedrooms, parking, offer, imageUrls, Realtor } = req.body;
    try {
        const alreadyListed = await prisma.listing.findUnique({
            where:{
                address: address
            }
        });
        if(alreadyListed) {
            return errorHandeler(400, "This address has already been listed");
        }
    }
    catch (error) {
        next(error)
    } 
    try {
        const newListing = await prisma.listing.create({
            data:{
                name: name,
                description: description,
                address: address,
                Price: Price,
                bathrooms: bathrooms,
                bedrooms: bedrooms,
                parking: parking,
                offer: offer,
                imageUrls: imageUrls,
                Realtor: Realtor
            }
        });
        res.json({status: 200, data: newListing, message: "Listing created successfully!"});
    } catch (error) {
        next(error);
    }
}