import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.router.js";
import userRoutes from "./routes/user.router.js"
import listRoutes from "./routes/createlisting.router.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log("Server is running on port 3000..........")
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