import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
        unique: true,
    },
    Price:{
        type: Number,
        required: true,
    },
    bedrooms:{
        type: Number,
        required: true,
    },
    bathrooms:{
        type: Number,
        required: true,
    },
    Realtor:{
        type: String,
        required: true,
    },
    imageUrls:{
        type: Array,
        required: true,
    },
    parking:{
        type: Boolean,
        required: true,
    },
    offer: {
        type: Boolean,
        required: true,
    },
}, {timestamps: true});

const Listing = new mongoose.model('Listing', listingSchema);

export default Listing;