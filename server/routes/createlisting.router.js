import express from "express"
import { createlisting } from "../controllers/createlisting.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createlisting);

export default router;