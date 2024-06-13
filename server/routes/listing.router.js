import express from "express"
import { createlisting, getListings, getOneListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createlisting);
router.get("/getall", getListings);
router.get("/getone/:id", getOneListing);


export default router;