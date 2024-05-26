import express from "express";
import { test } from "../controllers/user.controller.js";

const router = express.Router();

app.get("/", test);

export default router;