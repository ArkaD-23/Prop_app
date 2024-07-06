import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: [true,"This email is alredy registered!"],
    },
    password:{
        type: String,
        required: true,
    },
    contact_no:{
        type: String,
        required: true,
        unique: [true,"This number is already registered!"],
    },
    userType:{
        type: String,
        required: true,
    },
    favourites:{
        type: Array,
    },
    negotiations:{
        type: Array,
    }
} , {timestamps : true});

const User = mongoose.model('User',userSchema);

export default User;