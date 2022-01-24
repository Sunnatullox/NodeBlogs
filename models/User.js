const mongoose =require("mongoose");
const bcrypt= require("bcryptjs");


const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please, provide  your User Name"]
    },
    email:{
        type:String,
        required:[true, "Please, provide  your Email"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "Please, provide  your Password"]
    }
})

const User = mongoose.model("User", UserSchema);
module.exports = User;