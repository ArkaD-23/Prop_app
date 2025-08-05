import express from "express"
import { createCaption, createDescription, createlisting, deleteListing, getListings, getOneListing, openOffer, paymentSession, updateListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createlisting);
router.get("/getall", getListings);
router.get("/getone/:id", getOneListing);
router.post("/update/:id", verifyToken, updateListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/create-checkout-session/:id", verifyToken, paymentSession);
router.post("/offer", verifyToken, openOffer);
router.post("/caption", verifyToken, createCaption);
router.post("/description", verifyToken, createDescription);

export default router;