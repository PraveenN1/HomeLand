import mongoose from "mongoose";

const authSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Please provide your email"]
    },
    password:{
        type:String,
        required:[true,"Please provide your password"],
    }
});

export const authCollection = mongoose.model('auth',authSchema)