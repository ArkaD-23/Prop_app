import express from "express"
import { createlisting, getListings } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createlisting);
router.get("/getall", getListings);


export default router;