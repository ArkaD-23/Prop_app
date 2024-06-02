import express from "express"
import { createlisting, getAllListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createlisting);
router.get("/getall", verifyToken, getAllListing);


export default router;