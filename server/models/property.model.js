import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    age: {
        type:Number,
        required:true, 
    },
    price: {
        type:Number,
        required:true,
    },
    realtor: {
        type:String,
        required:true,
    },
    bedrooms: {
        type:Number,
        required:true,
    },
    bathrooms: {
        type:Number,
        required:true,
    },
} , {timestamps:true});

const Property = mongoose.model('Property', propertySchema);

export default Property;