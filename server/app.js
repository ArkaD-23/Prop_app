import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import listRoutes from "./routes/listing.route.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/server/user", userRoutes);
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

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.post("/webhook", express.raw({ type: "application/json" }), async (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        try {
          await Listing.findByIdAndDelete(session.metadata.listing_id);
        } catch (error) {
          console.log(`⚠️  Failed to delete listing: ${error.message}`);
        }
        break;
      case "checkout.session.expired":
        const checkoutSessionExpired = event.data.object;
        console.log("Checkout session has expired !")
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    response.send();
  }
);

export {app};