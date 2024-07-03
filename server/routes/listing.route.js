import express from "express"
import { createlisting, deleteListing, getListings, getOneListing, paymentSession, updateListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createlisting);
router.get("/getall", getListings);
router.get("/getone/:id", getOneListing);
router.post("/update/:id", verifyToken, updateListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/create-checkout-session/:id", verifyToken, paymentSession);

export default router;