import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js"
import listRoutes from "./routes/listing.route.js"
import mongoose from "mongoose";

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to the database........")
    })
    .catch((err) => {
        console.log(err);
    })

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log("Server is running on port 3000..........");
});

app.use("/server/user",userRoutes);
app.use("/server/auth", authRoutes);
app.use("/server/listing", listRoutes);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error.........";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});