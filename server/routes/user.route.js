import express from "express";
import { addToFavourites, deleteUser, emailSender, getUser, removeFavourite, test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyToken, updateUser);
router.post("/favourites/:id", verifyToken, addToFavourites);
router.post("/remove/:id", verifyToken, removeFavourite);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/:id", verifyToken, getUser);
router.post("/sendEmail", verifyToken, emailSender);

export default router;