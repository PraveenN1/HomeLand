import mongoose from "mongoose";

const responseSchema=mongoose.Schema({
    //name,email,phone,message
    id:{
        type:String,
        unique:true,
    },
    name:{
        type:String,
        required:"Name is required",
    },
    email:{
        type:String,
        match:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        required:"Email is required",
    },
    phone:{
        type:String,
        required:[true,'Phone Number is required'],
        validate:{
            validator:function(v){
                return /^\d{10}$/.test(v);
            },
            message: 'Enter a valid 10-digit phone number!'
        }
    },
    message:{
        type:String,
        required:false,
    },
},
    {
        timestamps:true,
    }
)

export const _response = mongoose.model('HomeLand',responseSchema);